import os
import streamlit as st
from PyPDF2 import PdfReader
from langchain.chains import ConversationChain
from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.prompts import (
    ChatPromptTemplate, 
    MessagesPlaceholder, 
    SystemMessagePromptTemplate, 
    HumanMessagePromptTemplate
)
from token_counter import get_number_tokens_from_openai, get_decoded_chunk

os.environ["OPENAI_API_KEY"] = st.secrets["API_KEY"]

#creates a summary of the full text pdf
def complete_summary(model, full_text):

    #create chunks of text
    chunks = create_chunks(full_text, 4000, 50)

    final_summary = ""

    # create summary that builds off itself (langchain)
    for index, chunk in enumerate(chunks):
        decoded_chunk = get_decoded_chunk(chunk, "cl100k_base")
        summary = get_summary(model, decoded_chunk)
        
        final_summary += summary

    return final_summary


#creates chunks of text instead of the full document
def create_chunks(full_text, chunk_size, overlap):
    chunks = []

    tokens_from_pdf = get_number_tokens_from_openai(full_text, "cl100k_base")

    for i in range(0, len(tokens_from_pdf), chunk_size - overlap):
        chunk = tokens_from_pdf[i:i+chunk_size]
        chunks.append(chunk)
    return chunks


# chooses which color to display percentage as based on value and displays it
def display_percentage(percentage):
    if percentage <= 20 and percentage > 0:
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


# extracts text from pdf documents
def extract_text(beginning_page, last_page):
    beginning_page -= 1
    last_page -= 1
    full_text = ""

    # PDF reader instance
    reader = PdfReader(st.session_state.pdf_file)

    # reads each page of pdf into text
    for i in range(beginning_page, last_page):
        page = reader.pages[i]
        full_text += page.extract_text()
    return full_text


# creates a prompt for the ai to use and responds to the user's inquiry
def get_explanation_with_memory(model, text_input, memory):
    prompt = ChatPromptTemplate.from_messages([
        SystemMessagePromptTemplate.from_template("""You are a helpful chatbot that is proficient in explaining text that is passed to it,
                                                     not just summarizing it. You will help the reader understand the meaning of the text 
                                                     being passed to you. If you do not have access to a complete text, you will not create 
                                                     the rest."""),
        MessagesPlaceholder(variable_name="history"),
        HumanMessagePromptTemplate.from_template("{input}")
    ])

    conversation = ConversationChain(memory=memory, 
                                    prompt=prompt,
                                    verbose= True, 
                                    llm=ChatOpenAI(temperature=0.6, model= model),)

    return conversation.predict(input=text_input)


# makes a summary of a chunk of text using openai and langchain
def get_summary(model: str, decoded_chunk: str):
    prompt = ChatPromptTemplate.from_messages([
        SystemMessagePromptTemplate.from_template("""You are a helpful bot that specializes in 
                                                    summarizing text without losing any of its meaning."""),
        MessagesPlaceholder(variable_name="history"),
        HumanMessagePromptTemplate.from_template("{input}")
    ])
    memory = ConversationBufferMemory(return_messages=True)
    conversation = ConversationChain(llm = ChatOpenAI(temperature=0, model=model),
                                     memory=memory,
                                     prompt=prompt,
                                     verbose=True,)
    return conversation.predict(input=decoded_chunk)


# makes the prompt for the AI to follow
# Each prompt involves a new perspective for the AI to consider the User's inquiry through
def make_prompt(guide):
    memory = st.session_state.memory

    if st.session_state.set_new_prompt:
        prompt = f"""You will be given a block of text. You will respond to this text 
        by creating an explanation of it, not just a summary, using the following to guide your response: 
        {guide}. For whatever text is provided to you, you will only provide the meaning to that text."""
    
        if st.session_state.prompt != prompt:
            st.session_state.prompt = prompt
            memory.chat_memory.add_user_message(st.session_state.prompt)
            memory.chat_memory.add_ai_message("Sure, input the text to be explained.")


# lets user know if there is an invalid page selection
def page_error(beginning_page, last_page):
        if beginning_page > last_page:
            st.error("Invalid Page Selection")
        elif (last_page - beginning_page) > 18:
            st.error("Too many pages for token limit")


# make prompt, response, add to streamlit chat memory
def summarize(model, guide, beginning_page, last_page, document_size):    

    #make prompt for ai to follow
    make_prompt(guide)
    
    if st.session_state.pdf_file:

        if beginning_page > last_page:
            st.error("Invalid Page Selection")

        full_text = extract_text(beginning_page, last_page)

        if document_size == "large ( > 13 pages )":

            #create smaller summaries of chunks of the text followed by one final summary of all of it
            final_summary = complete_summary(model, full_text)
            #add to chat memory
            st.session_state.user_message.append(final_summary)

            # creates summary based on input of final summary
            explanation = get_explanation_with_memory(model, final_summary, st.session_state.memory)

        else:
            if (last_page - beginning_page) > 12:
                st.error("Too many pages for a small document")

            #add to chat memory
            st.session_state.user_message.append(full_text)

            explanation = get_explanation_with_memory(model, full_text, st.session_state.memory)
            

        #add response to chat memory
        st.session_state.ai_message.append(explanation)


# tell code whether to set a new prompt
def prompt_change(guide):
    if guide:
        st.session_state.set_new_prompt = True


# reset session state vars if button is pressed
def reset_chat():
    del st.session_state.user_message
    del st.session_state.ai_message
    del st.session_state.memory
    del st.session_state.pdf_file