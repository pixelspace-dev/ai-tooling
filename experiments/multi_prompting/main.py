# User inputs prompts that they want the AI to use to consider their inquiry before responding
# Allows for greater levels of accuracy in responses
import streamlit as st
from langchain.memory import ConversationBufferMemory
from chat import send_message, prompt_change, reset_conversation, display_percentage
from token_counter import calculate_tokens_used

st.set_page_config(layout="wide")

# add variables to the session state so AI can remember what has been said
if 'memory' not in st.session_state:
    st.session_state.memory = ConversationBufferMemory(return_messages=True)
if 'chat' not in st.session_state:
    st.session_state.chat = []
if 'set_new_prompt' not in st.session_state:
    st.session_state.set_new_prompt = False
if 'prompt' not in st.session_state:
    st.session_state.prompt = ""

response = None


col1, col2 = st.columns([2,1.3], gap="large")
            
with col1:
    #header
    st.header(":blue[Multi-Prompt Chat]")
    st.subheader("Ask anything!")

    #chat and input box
    chat_placeholder = st.container()
    input_placeholder = st.form("chat-form")

with col2:
    #this is where the user can input prompts for the ai to use in considering its answer
    st.subheader("Customization")
    st.write("Add parameters to guide the AI's thought proccess")
    st.caption("EX: little angel on the user's shoulder")

    #prompt section
    prompt_placeholder = st.form("prompt-form")

    st.caption("The AI will consider each input together in its final response.")


with st.sidebar:
    st.subheader("Select Model")
    model = st.selectbox(label="Select Model", label_visibility="collapsed", options=["gpt-4", "gpt-3.5-turbo"])

    tokens_used_placeholder = st.container()

    st.caption("")
    st.subheader("Reset Conversation:")
    st.button(label="Clear", on_click=reset_conversation)


with prompt_placeholder:
    first_perspective = st.text_input("Prompt 1:")
    second_perspective = st.text_input("Prompt 2:")
    third_perspective = st.text_input("Prompt 3:")
    prompt_placeholder.form_submit_button(":blue[Set]", on_click= prompt_change(first_perspective,second_perspective,third_perspective))


# box with input and send button
with input_placeholder:
    input_col1, input_col2 = st.columns([5,1])

    input_col1.text_input(label="message", label_visibility="collapsed", key= "user_inquiry")
            
    input_col2.form_submit_button(":blue[Send]", on_click=send_message(model,first_perspective,second_perspective,third_perspective))

with tokens_used_placeholder:
    st.caption("")
    st.subheader("Tokens Used:")
    (tokens_used, percentage) = calculate_tokens_used(model)
    st.write("You have used " + str(tokens_used) + " tokens")

    st.caption("")
    st.subheader("Percentage of Tokens Remaining:")

    display_percentage(percentage)

#update visible chat  
with chat_placeholder:
        for chat_message in st.session_state.chat:
            st.markdown(chat_message)