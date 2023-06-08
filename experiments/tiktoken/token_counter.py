import tiktoken

#get_number_tokens_from_openai takes an input message and an encoding, and returns the number of tokens used
#this uses tiktoken, from openai
def get_number_tokens_from_openai(message: str, encoding: str) -> int:
    tokens = tiktoken.get_encoding(encoding).encode(message)
    return len(tokens)

#takes number of tokens used and the model used, returns the number of tokens left to be used, which can be used in the response
def how_many_tokens_remaining(tokens_used: int, model: str) -> str:
    if model == "gpt-4 / gpt-4-0314":
        leftover_tokens = 8192 - tokens_used
    elif model == "gpt-4-32k / gpt-4-32k-0314":
        leftover_tokens = 32768 - tokens_used
    elif model == "gpt-3.5":
        leftover_tokens = 4096 - tokens_used
    elif model == "gpt-3.5 code-davinci-002":
        leftover_tokens = 8001 - tokens_used
    else:
        leftover_tokens = 2049 - tokens_used
    return leftover_tokens