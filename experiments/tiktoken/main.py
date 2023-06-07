import streamlit as st
from token_counter import get_number_tokens_from_openai

#title
col1, col2, col3 = st.columns([1,2,1])

with col2:
   st.title("Token Counter")

#header
col11, col22, col23 = st.columns([.1,6,.1])

with col22:
    st.header(':violet[How many tokens does your message use?]')

#the function is used here
message = st.text_area("Message to be tokenized:", height= 10)

encoder = st.selectbox("Select and Encoder:", ['cl100k_base','p50k_base','p50k_edit','r50k_base'])

number_tokens = get_number_tokens_from_openai(message, encoder)

st.header(f'Number of tokens used: :violet[{number_tokens}]')


