import os
import streamlit as st
from PyPDF2 import PdfReader
from langchain.chains import ConversationChain
from langchain.chains.summarize import load_summarize_chain
from langchain.text_splitter import RecursiveCharacterTextSplitter
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
def get_explanation_with_memory(model, user_inquiry, memory):
    prompt = ChatPromptTemplate.from_messages([
        SystemMessagePromptTemplate.from_template("""You are a helpful chatbot that is proficient in explaining text that is passed to it.
                                                    You will help the reader understand the meaning of the text being passed to you.
                                                    If you do not have access to a complete text, you will not create the rest."""),
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
        prompt = f"""You will be given a block of text. You will respond to this text 
        by creating an explanation of it using the following to guide your response: 
        {input}. For whatever text is provided to you, you will only provide the meaning to that text."""
    
        if st.session_state.prompt != prompt:
            st.session_state.prompt = prompt
            memory.chat_memory.add_user_message(st.session_state.prompt)
            memory.chat_memory.add_ai_message("Sure, input the text to be explained.")


# make prompt, response, add to streamlit chat memory
def summarize(model, guide, beginning_page, last_page):    

    #make prompt for ai to follow
    make_prompt(guide)

    if st.session_state.pdf_file:
        #need to have a valid page selection
        if beginning_page > last_page:
            st.error("Invalid Page Selection")

        #array starts at zero, but user's page number doesn't
        beginning_page -= 1
        last_page -= 1
        full_text = ""

        # PDF reader instance
        reader = PdfReader(st.session_state.pdf_file)

        # reads each page of pdf into text
        for i in range(beginning_page, last_page):
            page = reader.pages[i]
            full_text += page.extract_text()

        #create chunks of text
        
        # create summary that builds off itself (langchain)

        # get an explanation from ai based on larger/more complex summary
        # creates summary based on input
        explanation = get_explanation_with_memory(model, full_text, st.session_state.memory)

        #add to chat history
        st.session_state.user_message.append(full_text)
        st.session_state.ai_message.append(explanation)


# tell code whether to set a new prompt
def prompt_change(input):
    if input:
        st.session_state.set_new_prompt = True


# reset session state vars if button is pressed
def reset_chat():
    del st.session_state.user_message
    del st.session_state.ai_message
    del st.session_state.memory
    del st.session_state.pdf_file