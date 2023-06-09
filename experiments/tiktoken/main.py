import streamlit as st
from token_counter import (
    get_number_tokens_from_openai, 
    how_many_tokens_remaining_as_int, 
    set_encoder
)

#title
col1, col2, col3 = st.columns([1,2,1])

with col2:
   st.title("Token Counter")

#header
header_col1, header_col2, header_col3 = st.columns([.1,6,.1])

with header_col2:
    st.header(':violet[How many tokens does your message use?]')

#find number of tokens used
message = st.text_area("Message to be tokenized:", height= 10)

model = st.selectbox("Which model are you using?", ["gpt-4", "gpt-4-32k", "gpt-3.5", "gpt-3.5 (code-davinci-002)", "gpt-3"])

#choose encoder based on model
encoder = set_encoder(model)

number_tokens = 0

#submit button
submit_col1, submit_col2, submit_col3 = st.columns([2.2,1,2])

with submit_col2:
    if st.button(':violet[Submit]'):
        number_tokens = get_number_tokens_from_openai(message, encoder)

# output
st.header(f'Number of tokens used: :violet[{number_tokens}]')

# calculate leftover tokens
leftover_tokens = how_many_tokens_remaining_as_int(number_tokens, model)

# output
if leftover_tokens > 0:
    st.subheader(f'There are :violet[{leftover_tokens}] tokens available')
elif leftover_tokens < 0:
    st.subheader("This is an unknown model")
else:
    st.subheader("Your message uses too many tokens for this model")

