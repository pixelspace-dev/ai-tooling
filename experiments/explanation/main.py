import streamlit as st

from page_configuration import enter_password, sidebar_configuration, guide_configuration, define_variables, file_input_configuration


# initialize session_state variables
define_variables()
response = None

## password protection
with st.sidebar:
    enter_password()

if st.session_state.correct_password:
    primary_col, guide_input_col = st.columns([2,1.3], gap="large")

    (model, document_size, summary_size) = sidebar_configuration()

    with guide_input_col:
        #this is where the user can input prompts for the ai to use in considering its answer
        st.subheader("Parameters")
        st.write("Add guidelines that tell the AI how to provide feedback")

        #prompt section
        with st.form("prompt-form"):
            guide = guide_configuration()  

    with primary_col:
        #header
        st.header(":green[Explanation-bot 🤖]")
        st.subheader("Helps you understand anything")

        #chat and input box
        explain_placeholder = st.empty()

        ### temporary (put intermediate_summary_placeholder as a variable in file_input_configuration if using it)
        # st.info("below this is the intermediate summaries:")
        # intermediate_summary_placeholder = st.container()
        ##
        with st.form("pdf-form"):
            file_input_configuration(explain_placeholder, model, guide, document_size, summary_size)