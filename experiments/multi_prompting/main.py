# User inputs prompts that they want the AI to use to consider their inquiry before responding
# Allows for greater levels of accuracy in responses
import streamlit as st
from langchain.memory import ConversationBufferMemory
from functions import make_prompt, get_response_with_memory

st.set_page_config(layout="wide")

    # adds the memory to the session state so AI can remember what has been said
if 'memory' not in st.session_state:
    st.session_state.memory = ConversationBufferMemory(return_messages=True)
if 'chat' not in st.session_state:
    st.session_state.chat = ""
if 'iteration' not in st.session_state:
    st.session_state.iteration = 0

response = None


col1, col2 = st.columns([2,1], gap="large")

with col2:
    #this is where the user can input prompts for the ai to use in considering its answer
    st.subheader("Customization")
    st.text("Add parameters to guide the AI's thought proccess")
    st.caption("EX: Output your inner monologue as described by the little angel on your shoulder advising for the wellbeing of the user.")
    first_prompt = st.text_area("Prompt 1:")
    second_prompt = st.text_area("Prompt 2:")
    third_prompt = st.text_area("Prompt 3:")

with col1:
    #header
    st.header(":blue[Multi-Prompt Chat]")
    st.subheader("Ask anything!")

    #input text to be analyzed
    user_inquiry = st.text_area("Text input:")

    #when button is pressed
    if st.button(':blue[Send]'):
        (memory, prompt) = make_prompt(st.session_state.memory, st.session_state.iteration, first_prompt, second_prompt, third_prompt)
        (response, memory) = get_response_with_memory(prompt, user_inquiry, st.session_state.memory)

        st.session_state.iteration = st.session_state.iteration + 1

        #update visible chat    
        st.session_state.chat = st.session_state.chat + "User - " + user_inquiry + '\n\n'
        
        if response:
            st.session_state.chat = st.session_state.chat  + "AI - " + response + '\n\n'

        st.info(st.session_state.chat)

        # hold on to chat memory for entire session
        st.session_state.memory = memory
