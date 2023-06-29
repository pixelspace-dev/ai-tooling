import os
import streamlit as st
import openai
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory
from langchain.chat_models import ChatOpenAI
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain.prompts import (
    ChatPromptTemplate, 
    MessagesPlaceholder, 
    SystemMessagePromptTemplate, 
    HumanMessagePromptTemplate
)
import asyncio
from typing import Any, Dict, List

from langchain.schema import LLMResult
from langchain.callbacks.base import AsyncCallbackHandler, BaseCallbackHandler

os.environ["OPENAI_API_KEY"] = st.secrets["API_KEY"]
openai.api_key = st.secrets["API_KEY"]


# creates a prompt for the ai to use and responds to the user's inquiry
## streams output in the terminal, but not in streamlit
def get_explanation(model, text_input, guide):
    prompt = ChatPromptTemplate.from_messages([
        SystemMessagePromptTemplate.from_template("""You are a helpful chatbot that is proficient in explaining text that is passed to it,"""),
        MessagesPlaceholder(variable_name="history"),
        HumanMessagePromptTemplate.from_template("{input}")
    ])
    response = []
    memory = ConversationBufferMemory(return_messages=True)
    conversation = ConversationChain(memory=memory, 
                                    prompt=prompt,
                                    verbose= True, 
                                    llm=ChatOpenAI(temperature=0.6, model= model, streaming=True, callbacks=[MyCustomSyncHandler()]),)
    bit_response = conversation.predict(input=text_input)

    for chunk in bit_response: # This for loop is only needed for token count
        response.append(chunk) 
        result = "".join(response).strip()

    return result

class MyCustomSyncHandler(BaseCallbackHandler):
    def on_llm_new_token(self, token: str, **kwargs) -> None:
        st.session_state.response.append(token)
        result = "".join(st.session_state.response).strip()
        st.markdown(result)  # print the response as it is generated




#### openai ####

# def get_explanation(model, text_input, guide):
#     """Get an explanation of provided text from openai"""
#     response = []

#     user_content = (f"""Process the following text based on the following guidelines:
#                         Provided Guidelines: {guide}
#                         Provided Text: {text_input}"""
#                     if guide else f"""You will explain the following text: {text_input}""")

#     bit_response = openai.ChatCompletion.create(model=model,
#                                                 messages=[
#                                                        {"role": "user", "content": f"{user_content}"}
#                                                 ],
#                                                 stream=True)
#     for chunk in bit_response:
#         if not chunk.choices[0].delta:
#             break  # End of the stream; break the loop

#         response.append(chunk.choices[0].delta.content)  # save the event response
#         result = "".join(response).strip()
#         st.markdown(result)  # print the response as it is generated
#     return result



## the following two stream the answer. When the answer is finished, there is an error
## for loop around response
# def get_explanation(model, text_input, guide):
#     response = []

#     if guide:
#         user_content = (f"""You will explain provided text using the provided guidelines.
#                         Provided Guidelines: {guide}
#                         Provided Text: {text_input}""")
#     else:
#         user_content=(f"""You will explain the following text: {text_input}""")

#     bit_response = openai.ChatCompletion.create(model=model,
#                                                 messages=[{"role": "system", "content":"""You are a helpful chatbot that is proficient 
#                                                         in explaining text that is passed to it, not just summarizing it. You will help 
#                                                         the reader understand the meaning of the text being passed to you. If you do not 
#                                                         have access to a complete text, you will not create the rest."""},
#                                                        {"role": "user", "content": f"{user_content}"}
#                                                 ],
#                                                 stream=True)
#     for chunk in bit_response:
#         response.append(chunk['choices'][0]['delta']['content'])  # save the event response
#         result = "".join(response).strip()
#         st.markdown(result)  # print the response as it is generated
#     return result


## for loop goes around openai call - maybe faster, but more choppy
# def get_explanation(model, text_input, memory):
#     response = []
#     explain_placeholder = st.empty()
#     for bit_response in openai.ChatCompletion.create(model=model,
#                                                 messages=[{"role": "system", "content":"""You are a helpful chatbot that is proficient in explaining text that is passed to it,
#                                                        not just summarizing it. You will help the reader understand the meaning of the text 
#                                                        being passed to you. If you do not have access to a complete text, you will not create 
#                                                        the rest."""},
#                                                        {"role": "user", "content": f"You will explain the following text: {text_input}"}
#                                                 ],
#                                                 stream=True):
#         response.append(bit_response['choices'][0]['delta']['content'])
#         result = "".join(response).strip()
#         explain_placeholder.markdown(f'*{result}*')
#     return result

