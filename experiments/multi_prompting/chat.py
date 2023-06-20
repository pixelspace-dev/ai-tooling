import os
import streamlit as st
from dotenv import load_dotenv
from langchain.chains import ConversationChain
from langchain.chat_models import ChatOpenAI
from langchain.prompts import (
    ChatPromptTemplate, 
    MessagesPlaceholder, 
    SystemMessagePromptTemplate, 
    HumanMessagePromptTemplate
)

load_dotenv()
os.environ["OPENAI_API_KEY"] = os.getenv('API_KEY')

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
def make_prompt(first_prompt, second_prompt, third_prompt):
    memory = st.session_state.memory

    if st.session_state.set_new_prompt:
        template = f"""{first_prompt} {second_prompt} {third_prompt} 
                    Finally, combine your previous considerations to create your final response."""
    
        memory.chat_memory.add_user_message(template)
        memory.chat_memory.add_ai_message("Sure, what's the user's inquiry?")

        st.session_state.set_new_prompt = False
    

# make prompt, response, add to streamlit chat memory
def send_message(model, first_prompt, second_prompt, third_prompt):    
    
    make_prompt(first_prompt, second_prompt, third_prompt)

    if st.session_state.user_inquiry:
        response = get_response_with_memory(model, st.session_state.user_inquiry, st.session_state.memory)

        st.session_state.chat.append("User - " + st.session_state.user_inquiry)
        st.session_state.chat.append("AI - " + response)


# tell code whether to set a new prompt
def prompt_change(first_prompt, second_prompt, third_prompt):
    if first_prompt or second_prompt or third_prompt:
        st.session_state.set_new_prompt = True


# reset session state vars if button is pressed
def reset_conversation():
    del st.session_state.chat
    del st.session_state.memory
    del st.session_state.user_inquiry