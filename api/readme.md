Token counter API

## API Endpoints

### GET /messages/
Returns the number of tokens used when given text input

#### FastAPI app:

Input encoding and message

Returns the encoding and the number of tokens used

```python
from fastapi import FastAPI
from typing  import Optional

app = FastAPI()

@app.get("/")
async def default_message():
    return {"Input": "Token Encoding and Message"}

@app.get("/messages/{token_encoding}")
async def process_message(token_encoding: str, message: Optional[str] = None):
    message = get_number_tokens_from_openai(message, token_encoding)
    return {"token_encoding": token_encoding, "number_of_tokens": message}

```

OpenAI token counter function using Tiktoken:

```python
import tiktoken

def get_number_tokens_from_openai(message: str, encoding: str) -> str:
    tokens = tiktoken.get_encoding(encoding).encode(message)
    return len(tokens)
```

In the search bar:
`/messages/cl100k_base?messages=this is a test`

Output:
```json
{"token_encoding":"cl100k_base","number_of_tokens":4}
```

#### Parameters

In the body we should send the text to be tokenized

```json
{
  "text": "This is a test"
}
```

#### Response

```json
{
  "tokens": 4
}
```
