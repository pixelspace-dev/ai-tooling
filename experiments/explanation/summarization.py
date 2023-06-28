import os
import streamlit as st
from pypdf import PdfReader
import openai

from langchain.chains import ConversationChain
from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.prompts import (
    ChatPromptTemplate, 
    MessagesPlaceholder, 
    SystemMessagePromptTemplate, 
    HumanMessagePromptTemplate
)
from token_counter import get_tokens_from_openai, get_decoded_chunk_from_openai, max_tokens

openai.api_key = st.secrets["API_KEY"] # for openai
os.environ["OPENAI_API_KEY"] = st.secrets["API_KEY"] # for langchain


def complete_summary(model: str, full_text: str) -> str:
    """Creates a summary of the full pdf."""

    chunk_size = (max_tokens(model) - 200)
    overlap = 50
    chunks = create_chunks(full_text, chunk_size, overlap)

    # create a summary of each chunk, then put all summaries together
    summaries = [get_partial_summary(model, get_decoded_chunk_from_openai(chunk, "cl100k_base")) for chunk in chunks]

    return " ".join(summaries)



def create_chunks(full_text: str, chunk_size: int, overlap: int) -> list:
    """Creates chunks of text instead of the full document."""   

    # find number of tokens in the entire document
    tokens_from_pdf = get_tokens_from_openai(full_text, "cl100k_base")

    # create a list of chunks of a specified size
    return [tokens_from_pdf[i:i+chunk_size] for i in range(0, len(tokens_from_pdf), chunk_size - overlap)]



def display_percentage(percentage):
    """Chooses which color to display the percentage as based on value and displays it."""
    color = ("red" if 0 < percentage <= 20 
             else "blue" if 20 < percentage <= 50
             else "green" if percentage > 50
             else None)
    if color:
        st.write(f":{color}[{percentage}%]")
    else:
        st.write(":red[0% Out of Tokens]")



def extract_text(beginning_page, last_page):
    """Extracts text from pdf documents."""

    # PDF reader instance
    reader = PdfReader(st.session_state.pdf_file)

    # reads each page of pdf into text
    pages = [reader.pages[i].extract_text() for i in range(beginning_page - 1, last_page)]

    return "".join(pages)



def get_explanation(model, text_input, guide):
    """Get an explanation of provided text from openai"""
    response = []

    user_content = (f"""Process the following text based on the following guidelines:
                        Provided Guidelines: {guide}
                        Provided Text: {text_input}"""
                    if guide else f"""You will explain the following text: {text_input}""")

    bit_response = openai.ChatCompletion.create(model=model,
                                                messages=[
                                                       {"role": "user", "content": f"{user_content}"}
                                                ],
                                                stream=True)
    for chunk in bit_response:
        if not chunk.choices[0].delta:
            break  # End of the stream; break the loop

        response.append(chunk.choices[0].delta.content)  # save the event response
        result = "".join(response).strip()
        st.markdown(result)  # print the response as it is generated
    return result



def get_partial_summary(model: str, decoded_chunk: str):
    """makes a summary of a chunk of text using openai and langchain"""
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
                                     verbose=True,
                                     )
    return conversation.predict(input=decoded_chunk)



def page_error(beginning_page, last_page):
    """lets user know if there is an invalid page selection"""
    if beginning_page > last_page:
        st.error("enter page selection in order from lower to higher page number")
        return True
    return False



def prompt_change(guide):
    """tell code whether to set a new prompt"""
    if guide:
        st.session_state.set_new_prompt = True



def reset_chat():
    """reset session state vars if button is pressed"""
    if hasattr(st.session_state, 'user_message'):
        del st.session_state.user_message
    if hasattr(st.session_state, 'ai_message'):
        del st.session_state.ai_message
    if hasattr(st.session_state, 'pdf_file'):
        del st.session_state.pdf_file



def summarize(model, guide, beginning_page, last_page, document_size):  
    """make prompt, response, add to streamlit chat memory"""  
    
    if not st.session_state.pdf_file or page_error(beginning_page, last_page):
        return

    full_text = extract_text(beginning_page, last_page)

    if document_size == "large ( > 10 pages or 8,000 tokens )":

        #create smaller summaries of chunks of the text followed by one final summary of all of it
        with st.spinner(text="Processing..."):
            final_summary = complete_summary(model, full_text)

            #add to chat memory
            st.session_state.user_message.append(final_summary)

            # creates summary based on input of final summary
        explanation = get_explanation(model, final_summary, guide)

    else:
        # are too many tokens used in pdf to generate response that is 200 tokens long
        if len(get_tokens_from_openai(full_text, "cl100k_base")) > (max_tokens(model)-200):
            st.error("Too many tokens for a small document - documents with charts and tables may use more tokens than others")
            return

        #add to chat memory
        st.session_state.user_message.append(full_text)

        explanation = get_explanation(model, full_text, guide)
            

    #add response to chat memory
    st.session_state.ai_message.append(explanation)