from langflow import load_flow_from_json
TWEAKS = [
  {
    "ChatOpenAI-yXuQq": {},
    "ConversationChain-Iasnx": {},
    "ConversationBufferMemory-36YGL": {},
    "Calculator-OTsC9": {},
    "WikipediaQueryRun-P1Ldf": {},
    "WikipediaAPIWrapper-n4nvd": {},
    "AgentInitializer-pQNgk": {}
  }
]
flow = load_flow_from_json("langflow_test.json", tweaks=TWEAKS)
# Now you can use it like any chain
flow("Hey, have you heard of LangFlow?")