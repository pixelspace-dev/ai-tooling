import tiktoken
import streamlit as st


# calculates the number of tokens used and the percent remaining
def calculate_tokens_used(model) -> int:
    tokens_used = 0
    base = "cl100k_base"
    
    for message in st.session_state.user_message:
        tokens_used += len(get_number_tokens_from_openai(message, base))
    for message in st.session_state.ai_message:
        tokens_used += len(get_number_tokens_from_openai(message, base))
    if st.session_state.set_new_prompt:
        tokens_used += len(get_number_tokens_from_openai(st.session_state.prompt, base)) + 9 
        # 9 is added because a response is attached to the prompt that says "Sure, input the text to be explained."
        st.session_state.set_new_prompt = False

    max = max_tokens(model)

    percentage = round((100 - (tokens_used/max)*100), 2)

    return tokens_used, percentage


def get_decoded_chunk(chunk, encoding):
    decoded_chunk = tiktoken.get_encoding(encoding).decode(chunk)
    return decoded_chunk

#get_number_tokens_from_openai takes an input message and an encoding, and returns the tokens used
#this uses tiktoken, from openai
def get_number_tokens_from_openai(message: str, encoding: str) -> int:
    tokens = tiktoken.get_encoding(encoding).encode(message)
    return tokens


#takes number of tokens used and the model used, returns the number of tokens left to be used, which can be used in the response
def max_tokens(model: str) -> int:
    token_limits = {
        "gpt-4": 8192,
        "gpt-3.5-turbo": 4096,
    }

    return token_limits.get(model, -1)





