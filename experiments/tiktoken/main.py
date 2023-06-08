import streamlit as st
from token_counter import get_number_tokens_from_openai, how_many_tokens_remaining

#title
col1, col2, col3 = st.columns([1,2,1])

with col2:
   st.title("Token Counter")

#header
col11, col22, col23 = st.columns([.1,6,.1])

with col22:
    st.header(':violet[How many tokens does your message use?]')

#find number of tokens used
message = st.text_area("Message to be tokenized:", height= 10)

encoder = st.selectbox("Select an Encoder:", ['cl100k_base','p50k_base','p50k_edit','r50k_base'])

number_tokens = get_number_tokens_from_openai(message, encoder)

st.header(f'Number of tokens used: :violet[{number_tokens}]')

#finds how many tokens are still available
model = st.selectbox("Which model are you using?", ["gpt-4 / gpt-4-0314", "gpt-4-32k / gpt-4-32k-0314", "gpt-3.5", "gpt-3.5 (code-davinci-002)", "gpt-3"])

leftover_tokens = how_many_tokens_remaining(number_tokens, model)

if leftover_tokens > 0:
    st.subheader(f'There are :violet[{leftover_tokens}] tokens available')
else:
    st.subheader("Your message uses too many tokens for this model")

