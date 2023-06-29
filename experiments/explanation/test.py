from unittest.mock import patch, MagicMock
from io import StringIO
import openai
import streamlit as st
from summarization import complete_summary, create_chunks, get_partial_summary, page_error, prompt_change, reset_chat, summarize, make_prompt
import token_counter
openai.api_key = st.secrets["API_KEY"]

#####summarization functions#####
def test_complete_summary():
    # prepared input
    model = "gpt-4"
    full_text = "Long document content..."
    summary_size = 1000

    # expected output
    expected_summary = "summary1 summary2 summary3"

    # mock dependent function calls
    with patch('summarization.max_tokens', return_value=1024), \
         patch('summarization.create_chunks', return_value=['chunk1', 'chunk2', 'chunk3']), \
         patch('summarization.get_partial_summary', side_effect=['summary1', 'summary2', 'summary3']), \
         patch('summarization.get_decoded_chunk_from_openai', side_effect=['chunk1', 'chunk2', 'chunk3']):

        # Run the function with the prepared input
        summary = complete_summary(model, full_text, summary_size)

        # Verify the function output with expected result
        assert summary == expected_summary, f"Expected {expected_summary}, but got {summary}"



def test_create_chunks():
    # Prepared input
    full_text = "This is a sample text to be chunked. It's quite short."
    chunk_size = 5
    overlap = 1

    # Mocked tokens from OpenAI
    mock_openai_tokens = list(range(10))  # Mocked output of get_tokens_from_openai function: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    expected_output = [[0,1, 2, 3, 4], [4, 5, 6, 7, 8], [8, 9]]

    with patch('summarization.get_tokens_from_openai', return_value=mock_openai_tokens):  
        output_chunks = create_chunks(full_text, chunk_size, overlap)

    assert output_chunks == expected_output, print(f"Expected {expected_output}, but got {output_chunks}")



#  doctor function to remove streamit calls
def display_percentage(percentage):
    """Chooses which color to display the percentage as based on value and displays it."""
    color = ("red" if 0 < percentage <= 20 
             else "blue" if 20 < percentage <= 50
             else "green" if percentage > 50
             else None)
    if color:
        write = (f":{color}[{percentage}%]")
    else:
        write = (":red[0% Out of Tokens]")
    print(write)



def test_display_percentage():
    # test data and expected result
    test_data = [
        (15, ":red[15%]"),
        (30, ":blue[30%]"),
        (60, ":green[60%]"),
        (0, ":red[0% Out of Tokens]"),
    ]
    
    for percentage, expected in test_data:
        # redirect standard output to a string buffer
        with patch('sys.stdout', new=StringIO()) as fake_out:
            display_percentage(percentage)

            # get the function's printed output
            result = fake_out.getvalue().strip()  
            assert result == expected, f"For input {percentage}, expected {expected} but got {result}"



#split function to test part that does not use an external library
def extract_text_from_pdf_reader(beginning_page, last_page, reader):
    """Extracts text from pdf documents."""
    pages = [reader.pages[i].extract_text() for i in range(beginning_page - 1, last_page)]
    return " ".join(pages) 

class MockPdfReader:
     def __init__(self, pages):
        self.pages = pages

class MockPage:
    def __init__(self, text):
        self.text = text

    def extract_text(self):
        return self.text

def test_extract_text_from_pdf_reader():
    pages = [MockPage("Page One"), MockPage("Page Two"), MockPage("Page Three"), MockPage("Page Four")]
    reader = MockPdfReader(pages)
    text = extract_text_from_pdf_reader(1, 4, reader)
    assert text == "Page One Page Two Page Three Page Four"



# separate the function - part that is testable from part that is not (streamlit)
def generate_explanation(model, text_input, guide):
    """Generates an explanation of provided text from openai"""
    response = []
    
    user_content = (f"""You will explain provided text using the provided guidelines.
                        Provided Guidelines: {guide}
                        Provided Text: {text_input}"""
                    if guide 
                    else f"""You will explain the following text: {text_input}""")

    bit_response = openai.ChatCompletion.create(model=model,
                                                messages=[{"role": "system", "content":"""You are a helpful chatbot....(snipped)"""}, 
                                                          {"role": "user", "content": f"{user_content}"}], 
                                                stream=True)
    for chunk in bit_response:
        if not chunk.choices[0].delta:
            break  # End of the stream; break the loop
            
        response.append(chunk.choices[0].delta.content)
        
    return "".join(response).strip()

def get_explanation(model, text_input, guide):
    """Get an explanation of provided text, and print it to Streamlit output"""
    result = generate_explanation(model, text_input, guide)
    st.markdown(result)
    return result

def test_generate_explanation():
    # We define mocked output of openai.ChatCompletion.create()
    class MockedResponse:
        class _Completion:
            def __init__(self, content):
                self.delta = self
                self.content = content

        def __init__(self, completions):
            self.choices = [self._Completion(completions)]  # 'choices' now a list of _Completion

        def __iter__(self):
            yield self

    mocked_responses = [MockedResponse("Response 1"), MockedResponse(None)]

    with patch('openai.ChatCompletion.create', side_effect=mocked_responses):
        model = 'gpt-4'
        text_input = 'Some text input'
        guide = 'Some guidelines'
        response = generate_explanation(model, text_input, guide)
        assert response == "Response 1", f"Expected 'Response 1', but got '{response}'"



@patch('summarization.ConversationBufferMemory')  # replace these with correct paths
@patch('summarization.ChatOpenAI')
@patch('summarization.ConversationChain')
@patch('summarization.HumanMessagePromptTemplate')
@patch('summarization.MessagesPlaceholder')
@patch('summarization.SystemMessagePromptTemplate')
@patch('summarization.ChatPromptTemplate')
def test_get_partial_summary(ChatPromptTemplate, SystemMessagePromptTemplate, 
                             MessagesPlaceholder, HumanMessagePromptTemplate, 
                             ConversationChain, ChatOpenAI, ConversationBufferMemory):
    # Note: decorators apply in reverse order, so the argument order is reversed.
    
    # Mocking external dependencies
    conversation_mock = MagicMock()
    conversation_mock.predict.return_value = 'Summarized Text'
    ConversationChain.return_value = conversation_mock

    # Function call
    response = get_partial_summary('model', 'decoded_chunk')

    assert response == 'Summarized Text', "Prediction value mismatch in get_partial_summary function."
    # Verifying the interactions
    ConversationChain.assert_called_once()
    conversation_mock.predict.assert_called_once_with(input='decoded_chunk')


@patch('summarization.st.session_state', new_callable=MagicMock)  # Mock session_state
def test_make_prompt(mock_session_state):
    mock_session_state.memory = MagicMock()
    # Mock chat_memory within memory
    mock_session_state.memory.chat_memory = MagicMock()

    guide = "Some guide"
    prompt = f"""Process the following text based on the following guidelines: {guide}"""

    # Test the function with set_new_prompt True and prompt different than the created one
    mock_session_state.set_new_prompt = True
    mock_session_state.prompt = "Different prompt"
    print(mock_session_state.prompt)
    
   
    make_prompt(guide)

    # verify the interactions
    assert mock_session_state.prompt == prompt, "Prompt does not match the expected value"
    mock_session_state.memory.chat_memory.add_user_message.assert_called_once_with(prompt)
    mock_session_state.memory.chat_memory.add_ai_message.assert_called_once_with("Sure, what is the provided text?")


@patch('streamlit.error')  # Mock st.error
def test_page_error(mock_error):
    assert page_error(1, 2) is False  # No error
    mock_error.assert_not_called()  # No error message should have been displayed

    assert page_error(3, 2) is True  # Error
    mock_error.assert_called_once_with("enter page selection in order from lower to higher page number")  # Error message should be displayed once

    mock_error.reset_mock()  # Reset the mock for the next part of the test

    assert page_error(2, 2) is False  # No error, equal page numbers are still in order.
    mock_error.assert_not_called()  # No error message should have been displayed



@patch('streamlit.session_state', new_callable=MagicMock)  # Mock st.session_state
def test_prompt_change(mock_session_state):

    # Test when guide is empty
    prompt_change('')
    assert 'set_new_prompt' not in mock_session_state.__dict__, "Unexpected attribute set_new_prompt"

    # Test when guide is not empty
    prompt_change('Some guide')
    assert 'set_new_prompt' in mock_session_state.__dict__, "Failed to set attribute set_new_prompt"
    assert mock_session_state.set_new_prompt is True, "set_new_prompt should be True"



@patch('streamlit.session_state', new_callable=MagicMock)  # Mock Session State
def test_reset_chat(mock_session_state):
    # Set some initial state
    mock_session_state.user_message = "Something"
    mock_session_state.ai_message = "Something else"
    mock_session_state.pdf_file = "File.pdf"

    reset_chat()  # Call the function that resets session state vars

    # Checking the attributes
    assert not hasattr(mock_session_state, 'user_message'), "'user_message' attribute was not deleted properly"
    assert not hasattr(mock_session_state, 'ai_message'), "'ai_message' attribute was not deleted properly"
    assert not hasattr(mock_session_state, 'pdf_file'), "'pdf_file' attribute was not deleted properly"

    # Testing the scenario where attributes do not exists before the function call
    reset_chat()  # This should not raise any exceptions



@patch('summarization.st.session_state', new_callable=MagicMock)  # Mock Session State
@patch('summarization.page_error', return_value=False)
@patch('summarization.extract_text', return_value="Extracted Text")
@patch('summarization.complete_summary', return_value="Final Summary")
@patch('summarization.get_explanation', return_value="Explanation")
@patch('summarization.get_tokens_from_openai', return_value=list(range(200)))  # Return a list with 200 tokens
@patch('summarization.max_tokens', return_value=400)  # Return max token of 400
def test_summarize(mock_max_tokens, mock_get_tokens, mock_get_explanation, mock_complete_summary, 
                   mock_extract_text, mock_page_error, mock_session_state):
                   
    # Arrange
    mock_session_state.pdf_file = "some_file.pdf"
    mock_session_state.user_message = []
    mock_session_state.ai_message = []
    
    model, guide = "gpt-3", "Some guide"
    beginning_page, last_page = 1, 10
    summary_size = 1000

    # Test the function with large document
    summarize(model, guide, beginning_page, last_page, "large ( > 10 pages or 8,000 tokens )", summary_size)
    assert mock_session_state.user_message == ["Final Summary"], "User message does not match for large document"
    assert mock_session_state.ai_message == ["Explanation"], "AI message does not match for large document"

    # Reset the state of mock_st.session_state.user_message and .ai_message for the next test
    mock_session_state.user_message = []
    mock_session_state.ai_message = []

    # Test the function with small document
    summarize(model, guide, beginning_page, last_page, "small", summary_size)
    assert mock_session_state.user_message == ["Extracted Text"], "User message does not match for small document"
    assert mock_session_state.ai_message == ["Explanation"], "AI message does not match for small document"




#####token counter functions#####
@patch('token_counter.st.session_state', new_callable=MagicMock)  # Mock st.session_state
@patch('token_counter.get_tokens_from_openai', return_value=["token1", "token2", "token3"])  # Assume each message is 3 tokens
@patch('token_counter.max_tokens', return_value=100)  # Assume max token is 100 tokens
def test_calculate_tokens_used(mock_max_tokens, mock_get_tokens, mock_session_state):
    # Arrange
    mock_session_state.user_message = ["Dummy message", "Another dummy message"]  # 2 messages of 3 tokens each
    mock_session_state.ai_message = ["Dummy message"]  # 1 message of 3 tokens
    mock_session_state.set_new_prompt = True
    mock_session_state.prompt = "Dummy prompt"  # 3 tokens

    expected_token_count = (3 * len(mock_session_state.user_message)  # Tokens from user_message (2 messages of 3 tokens each)
                            + 3 * len(mock_session_state.ai_message)  # Tokens from ai_message (1 message of 3 tokens)
                            + 3 + 9)  # Tokens from prompt (3 tokens + 9 additional tokens as stated in the function)
    expected_percentage = round((100 - (expected_token_count / 100) * 100), 2)  # Calculated expected percentage
    
    # Act
    token_count, percentage = token_counter.calculate_tokens_used('model')  # model argument is ignored as we've mocked max_tokens method

    # Assert
    assert token_count == expected_token_count, f"Expected token count {expected_token_count}, but got {token_count}"
    assert percentage == expected_percentage, f"Expected remaining percentage {expected_percentage}, but got {percentage}"
    assert not mock_session_state.set_new_prompt, "set_new_prompt should have been set to False"



@patch('tiktoken.get_encoding')
def test_get_decoded_chunk_from_openai(mock_get_encoding):
    # We construct a mock "encoding" object that will
    # return a specific decoded chunk when decode is called
    mock_encoding = MagicMock()
    mock_encoding.decode.return_value = 'decoded chunk'
    mock_get_encoding.return_value = mock_encoding

    chunk = 'mock chunk'
    encoding = 'mock encoding'

    # Test the function using the mocks
    decoded_chunk = token_counter.get_decoded_chunk_from_openai(chunk, encoding)

    # Check that the correct encoding was requested
    mock_get_encoding.assert_called_once_with(encoding)

    # Check that the decode method was called on the result with the correct chunk
    mock_encoding.decode.assert_called_once_with(chunk)

    # Check that the function returns the correct result
    assert decoded_chunk == 'decoded chunk'



@patch('tiktoken.get_encoding')
def test_get_tokens_from_openai(mock_get_encoding):
    # Mock encoding object
    mock_encoding = MagicMock()
    mock_encoding.encode.return_value = ['token1', 'token2', 'token3']
    # tiktoken.get_encoding returns the mock encoding object
    mock_get_encoding.return_value = mock_encoding

    # Test input
    message = 'dummy message'
    encoding = 'dummy encoding'

    # Expected output tokens from the function
    expected_output_tokens = ['token1', 'token2', 'token3']

    # Call the function with test input
    output_tokens = token_counter.get_tokens_from_openai(message, encoding)

    # Verify interactions
    mock_get_encoding.assert_called_once_with(encoding)
    mock_encoding.encode.assert_called_once_with(message)

    # Check if the function returns the correct tokens
    assert output_tokens == expected_output_tokens, "get_tokens_from_openai returned incorrect tokens"



def test_max_tokens():
    # Test with a model which is in the dictionary, expect the correct number of tokens
    assert token_counter.max_tokens("gpt-4") == 8192, "max_tokens returned incorrect value for gpt-4 model"
    assert token_counter.max_tokens("gpt-3.5-turbo") == 4096, "max_tokens returned incorrect value for gpt-3.5-turbo model"

    # Test with a model which is not in the dictionary, expect -1
    assert token_counter.max_tokens("non_existent_model") == -1, "max_tokens returned incorrect value for non-existent model"