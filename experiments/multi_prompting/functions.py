import os
from dotenv import load_dotenv
from langchain.chains import ConversationChain
from langchain.chat_models import ChatOpenAI
from langchain.prompts import (
    ChatPromptTemplate, 
    MessagesPlaceholder, 
    SystemMessagePromptTemplate, 
    HumanMessagePromptTemplate
)

load_dotenv()
os.environ["OPENAI_API_KEY"] = os.getenv('API_KEY')

# makes the prompt for the AI to follow
def make_prompt(memory, iteration,first_prompt_word, second_prompt_word, third_prompt_word):
    
    template = f"""{first_prompt_word} {second_prompt_word} {third_prompt_word}"""

    if iteration < 1:
        memory.chat_memory.add_user_message(template)
        memory.chat_memory.add_ai_message("Sure, what's the user's inquiry?")
    return memory, template


# creates a prompt for the ai to use and responds to the user's inquiry
def get_response_with_memory(template, user_inquiry, history):
    prompt = ChatPromptTemplate.from_messages([
        SystemMessagePromptTemplate.from_template(template),
        MessagesPlaceholder(variable_name="history"),
        HumanMessagePromptTemplate.from_template("{input}")
    ])
    memory = history
    conversation = ConversationChain(memory=memory, 
                                    prompt=prompt,
                                    verbose= True, 
                                    llm=ChatOpenAI(temperature=0.6, model= "gpt-4"),)
    response = conversation.predict(input=user_inquiry)

    return response, memory
    
