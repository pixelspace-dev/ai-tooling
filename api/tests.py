#This file contains the functions that were used in the testing process
from authorization import how_many_tokens_remaining_as_int, set_encoder

def test_how_many_tokens_remaining_as_int():
    # Test different inputs and expected outputs
    test_cases = [
        (5, "gpt-4", 8187),
        (100, "gpt-4-32k", 32668),
        (200, "gpt-3.5", 3896),
        (400, "gpt-3.5 (code-davinci-002)", 7601),
        (1000, "gpt-3", 1049),
        (5000, "unknown-model", -5001),
    ]

    for tokens_used, model, expected_remaining in test_cases:
        result = how_many_tokens_remaining_as_int(tokens_used, model)
        assert (
            result == expected_remaining
        ), f"Expected {expected_remaining} for {model} with {tokens_used} tokens used, but got {result}"
        
    print("All tests passed for test_how_many_tokens_remaining_as_int")


# Run the tests
test_how_many_tokens_remaining_as_int()


def test_set_encoder():
    # Test different inputs and expected outputs
    test_cases = [
        ("gpt-4", "cl100k_base"),
        ("gpt-4-32k", "cl100k_base"),
        ("gpt-3.5 (code-davinci-002)", "p50k_base"),
        ("gpt-3", "r50k_base"),
        ("unknown-model", "cl100k_base"),
    ]

    for model, expected_encoder in test_cases:
        result = set_encoder(model)
        assert (
            result == expected_encoder
        ), f"Expected encoder {expected_encoder} for {model}, but got {result}"
    
    print("All tests passed for test_set_encoder")


# Run the tests
test_set_encoder()