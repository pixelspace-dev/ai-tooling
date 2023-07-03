import os
import streamlit as st
from langchain.utilities import WikipediaAPIWrapper
from langchain.tools import DuckDuckGoSearchRun
from langchain import LLMMathChain
from langchain.agents import initialize_agent, Tool, AgentType
from langchain.callbacks.base import BaseCallbackHandler
from langchain.chat_models import ChatOpenAI
from langchain.prompts import (
    ChatPromptTemplate, 
    MessagesPlaceholder, 
    SystemMessagePromptTemplate, 
    HumanMessagePromptTemplate
)

os.environ["OPENAI_API_KEY"] = st.secrets["API_KEY"]

# ai will consult list of tools and decide if it needs to use them to respond to the user
def choose_tool(llm):

    wikipedia = WikipediaAPIWrapper()
    llm_math_chain = LLMMathChain.from_llm(llm=llm)
    search = DuckDuckGoSearchRun()

    tools = [
        Tool(
        name = "Wikipedia",
        func=wikipedia.run,
        description="useful for when you need to answer questions about specific topics"
        ),
        Tool(
        name="Calculator",
        func=llm_math_chain.run,
        description="useful for when you need to answer questions about math"),
                Tool(
        name="Search",
        func=search.run,
        description="""useful for when you need to search for information using the internet 
                    such as finding real time information. Whenever you think you can't answer something,
                    you can try to Search for it."""),
        ]
    return tools



# chooses which color to display percentage as based on value and displays it
def display_percentage(percentage):
    if percentage <= 20:
        percentage = str(percentage)
        st.write( f":red[{percentage}%]")

    elif percentage > 20 and percentage <= 50:
        percentage = str(percentage)
        st.write( f":blue[{percentage}%]")

    elif percentage > 50:
        percentage = str(percentage)
        st.write( f":green[{percentage}%]")



# creates a prompt for the ai to use and responds to the user's inquiry
def get_response_with_memory(model, user_inquiry):
    prompt = ChatPromptTemplate.from_messages([
        SystemMessagePromptTemplate.from_template("You are a helpful chatbot"),
        MessagesPlaceholder(variable_name="history"),
        HumanMessagePromptTemplate.from_template("{input}")
    ])
    response = []
    llm = ChatOpenAI(temperature=0.6, model=model, streaming=True, callbacks=[MyCustomSyncHandler()], verbose=True)
    tools = choose_tool(llm)

    agent = initialize_agent(tools, llm, agent=AgentType.CONVERSATIONAL_REACT_DESCRIPTION, verbose=True, memory=st.session_state.memory, prompt=prompt)
    bit_response = agent.run(user_inquiry )
    
    for chunk in bit_response: # This for loop is only needed for token count
        response.append(chunk) 
        result = "".join(response).strip()

    return result

class MyCustomSyncHandler(BaseCallbackHandler):
    def on_llm_new_token(self, token: str, **kwargs) -> None:
        
        st.session_state.response.append(token)
        if  "AI" in st.session_state.response:
            if st.session_state.prompt == "":
                result = "AI: " + "".join(st.session_state.response[2:]).strip()
                st.markdown(result)  # print the response as it is generated
            else:
                result = "".join(st.session_state.response[2:]).strip()
                st.markdown(result)  # print the response as it is generated
        else:
            st.session_state.response.pop()



# makes the prompt for the AI to follow
# Each prompt involves a new perspective for the AI to consider the User's inquiry through
def make_prompt(first_perspective, second_perspective, third_perspective):
    memory = st.session_state.memory

    if st.session_state.set_new_prompt:
        prompt = f"""Rationalize each following user inquiry from the following perspectives: 
            {first_perspective}, {second_perspective} {third_perspective}.
            Your output to the inquiry will be:
            {first_perspective}: (Your thoughts about the user inquiry from this perspective)
            {second_perspective}: (Your thoughts about the user inquiry from this perspective)
            {third_perspective}: (Your thoughts about the user inquiry from this perspective
            Actual answer: Your job is to take all perspectives and merge them into a single answer. 
            Your answer must contain aspects of all perspectives, even if these perspectives seem to 
            contradict or challenge each other. After your answer, you will provide an explaination of 
            how each of the perspectives influence your response.)"""
        if st.session_state.prompt != prompt:
            st.session_state.prompt = prompt
            memory.chat_memory.add_user_message(st.session_state.prompt)
            memory.chat_memory.add_ai_message("Sure, what's the user's inquiry?")
    


# make prompt, response, add to streamlit chat memory
def send_message(model, first_perspective, second_perspective, third_perspective):    
    
    make_prompt(first_perspective, second_perspective, third_perspective)

    if st.session_state.user_inquiry:

        response = get_response_with_memory(model, st.session_state.user_inquiry)
        st.session_state.chat.append(f"AI: {response}") if st.session_state == "" else st.session_state.chat.append(response)



# add input message to chat history and print chat
def print_chat():
     if st.session_state.user_inquiry:
        st.session_state.chat.append("User: " + st.session_state.user_inquiry)

        for chat_message in st.session_state.chat:
            st.markdown(chat_message)



# tell code whether to set a new prompt
def prompt_change(first_perspective, second_perspective, third_perspective):
    if first_perspective or second_perspective or third_perspective:
        st.session_state.set_new_prompt = True



# reset session state vars if button is pressed
def reset_conversation():
    del st.session_state.chat
    del st.session_state.memory
    del st.session_state.user_inquiry