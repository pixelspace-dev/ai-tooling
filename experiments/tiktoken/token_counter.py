import tiktoken

#get_number_tokens_from_openai takes an input message and an encoding, and returns the number of tokens used
#this uses tiktoken, from openai
def get_number_tokens_from_openai(input: str, encoding: str) -> str:
    tokens = tiktoken.get_encoding(encoding).encode(input)
    return len(tokens)