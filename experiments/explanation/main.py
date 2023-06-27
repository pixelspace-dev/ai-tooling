import streamlit as st
from summarization import summarize, prompt_change, reset_chat, display_percentage
from token_counter import calculate_tokens_used

st.set_page_config(layout="wide",)

# add variables to the session state so AI can remember what has been said
if 'user_message' not in st.session_state:
    st.session_state.user_message = []
if 'ai_message' not in st.session_state:
    st.session_state.ai_message = []
if 'set_new_prompt' not in st.session_state:
    st.session_state.set_new_prompt = False
if 'prompt' not in st.session_state:
    st.session_state.prompt = ""

response = None


col1, col2 = st.columns([2,1.3], gap="large")
            
with col1:
    #header
    st.header(":green[Explanation-bot 🤖]")
    st.subheader("Helps you understand anything")

    #chat and input box
    explain_placeholder = st.empty()
    file_input_placeholder = st.form("pdf-form")

with col2:
    #this is where the user can input prompts for the ai to use in considering its answer
    st.subheader("Parameters")
    st.write("Add guidelines that tell the AI how to provide feedback")
    st.caption("EX: Output explanation simple terms and in as few words as possible")

    #prompt section
    guide_placeholder = st.form("prompt-form")


with st.sidebar:
    st.subheader("Select Model")
    model = st.selectbox(label="Select Model", label_visibility="collapsed", options=["gpt-4", "gpt-3.5-turbo"])

    st.caption("")
    st.subheader("Document Size")
    document_size = st.selectbox(label="Select Document Size", label_visibility="collapsed", options=["small ( < 10 pages or 8,000 tokens )", "large ( > 10 pages or 8,000 tokens )"])

    tokens_used_placeholder = st.container()

    st.caption("")
    st.button(label="Clear Chat", on_click=reset_chat)


with guide_placeholder:
    guide = st.text_area(label="Summary guidelines", label_visibility="collapsed")
    guide_col1, guide_col2, guide_col3 = st.columns([3,1.4,3])
    guide_col2.form_submit_button(":green[Set]", on_click= prompt_change(guide))


# box with input and send button
with file_input_placeholder:
    beginning_page = st.number_input("First Page:", step=1, value=1)
    last_page = st.number_input("Last Page:", step=1, value=2)
    st.file_uploader(label="file", label_visibility="collapsed", key="pdf_file")

    input_col1, input_col2, input_col3= st.columns([3,1.2,3])
    if input_col2.form_submit_button(":green[Submit]"):
        with explain_placeholder:
            summarize(model, guide, beginning_page, last_page, document_size)


with tokens_used_placeholder:
    st.caption("")
    st.subheader("Tokens Used:")
    (tokens_used, percentage) = calculate_tokens_used(model)
    st.write("You have used " + str(tokens_used) + " tokens")

    st.caption("")
    st.subheader("Percentage of Tokens Remaining:")

    display_percentage(percentage)