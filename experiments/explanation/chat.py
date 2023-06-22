import os
import streamlit as st
from langchain.chains import ConversationChain
from langchain.chat_models import ChatOpenAI
from langchain.prompts import (
    ChatPromptTemplate, 
    MessagesPlaceholder, 
    SystemMessagePromptTemplate, 
    HumanMessagePromptTemplate
)

os.environ["OPENAI_API_KEY"] = st.secrets["API_KEY"]

# chooses which color to display percentage as based on value and displays it
def display_percentage(percentage):
    if percentage <= 20:
        percentage = str(percentage)
        st.write( f":red[{percentage}%]")

    elif percentage > 20 and percentage <= 50:
        percentage = str(percentage)
        st.write( f":blue[{percentage}%]")

    elif percentage > 50:
        percentage = str(percentage)
        st.write( f":green[{percentage}%]")
    else:
        st.write(":red[0% Out of Tokens]")


# creates a prompt for the ai to use and responds to the user's inquiry
def get_response_with_memory(model, user_inquiry, memory):
    prompt = ChatPromptTemplate.from_messages([
        SystemMessagePromptTemplate.from_template("You are a helpful chatbot"),
        MessagesPlaceholder(variable_name="history"),
        HumanMessagePromptTemplate.from_template("{input}")
    ])

    conversation = ConversationChain(memory=memory, 
                                    prompt=prompt,
                                    verbose= True, 
                                    llm=ChatOpenAI(temperature=0.6, model= model),)
    
    response = conversation.predict(input=user_inquiry)

    return response


# makes the prompt for the AI to follow
# Each prompt involves a new perspective for the AI to consider the User's inquiry through
def make_prompt(input):
    memory = st.session_state.memory

    if st.session_state.set_new_prompt:
        st.session_state.prompt = f"""You will be given a block of text. You will respond to this text 
        by creating an explanation of it using the following to guide your response: 
        {input}."""
    
        memory.chat_memory.add_user_message(st.session_state.prompt)
        memory.chat_memory.add_ai_message("Sure, input the text to be explained.")


# make prompt, response, add to streamlit chat memory
def send_message(model, input):    

    make_prompt(input)

    if st.session_state.user_inquiry:
        response = get_response_with_memory(model, st.session_state.user_inquiry, st.session_state.memory)

        st.session_state.chat.append("User - " + st.session_state.user_inquiry)
        st.session_state.chat.append("Explanation - " + response)


# tell code whether to set a new prompt
def prompt_change(input):
    if input:
        st.session_state.set_new_prompt = True


# reset session state vars if button is pressed
def reset_conversation():
    del st.session_state.chat
    del st.session_state.memory
    del st.session_state.user_inquiry