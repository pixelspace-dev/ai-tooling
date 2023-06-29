import tiktoken
import streamlit as st

def calculate_tokens_used(model) -> int:
    """calculates the number of tokens used and the percent remaining"""
    tokens_used = 0
    base = "cl100k_base"
    
    for message in st.session_state.user_message:
        tokens_used += len(get_tokens_from_openai(message, base))
    for message in st.session_state.ai_message:
        tokens_used += len(get_tokens_from_openai(message, base))
    if st.session_state.set_new_prompt:
        tokens_used += len(get_tokens_from_openai(st.session_state.prompt, base)) + 17
        # 17 is added because a response is attached to the prompt that says "You are a helpful chatbot that is proficient in explaining text that is passed to i"
        st.session_state.set_new_prompt = False

    max = max_tokens(model)

    percentage = round((100 - (tokens_used/max)*100), 2)

    return tokens_used, percentage



def get_decoded_chunk_from_openai(chunk, encoding):
    """decodes a list of tokens that is passed to it"""
    decoded_chunk = tiktoken.get_encoding(encoding).decode(chunk)
    return decoded_chunk



def get_tokens_from_openai(message: str, encoding: str) -> int:
    """get_number_tokens_from_openai takes an input message and an encoding, and returns the tokens used"""
    tokens = tiktoken.get_encoding(encoding).encode(message)
    return tokens



def max_tokens(model: str) -> int:
    """takes number of tokens used and the model used, returns the number of tokens left to be used, which can be used in the response"""
    token_limits = {
        "gpt-4": 8192,
        "gpt-3.5-turbo": 4096,
    }
    return token_limits.get(model, -1)





