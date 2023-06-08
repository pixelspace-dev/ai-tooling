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


def how_many_tokens_remaining_as_int(tokens_used: int, model: str) -> int:
    token_limits = {
        "gpt-4 / gpt-4-0314": 8192,
        "gpt-4-32k / gpt-4-32k-0314": 32768,
        "gpt-3.5": 4096,
        "gpt-3.5 code-davinci-002": 8001,
    }
    
    leftover_tokens = token_limits.get(model, -1) - tokens_used

    return leftover_tokens

# tests
import unittest 

class TestHowManyTokensRemainingAsInt(unittest.TestCase):

    def test_known_model(self):
        self.assertEqual(how_many_tokens_remaining_as_int(1000, "gpt-4 / gpt-4-0314"), 7192)
        self.assertEqual(how_many_tokens_remaining_as_int(2000, "gpt-4-32k / gpt-4-32k-0314"), 30768)
        self.assertEqual(how_many_tokens_remaining_as_int(1500, "gpt-3.5"), 2596)
        self.assertEqual(how_many_tokens_remaining_as_int(6500, "gpt-3.5 code-davinci-002"), 1501)

    def test_unknown_model(self):
        self.assertEqual(how_many_tokens_remaining_as_int(500, "unknown_model_1"), 1549)
        self.assertEqual(how_many_tokens_remaining_as_int(1000, "unknown_model_2"), 1049)

if __name__ == '__main__':
    unittest.main()