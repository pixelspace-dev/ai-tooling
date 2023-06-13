
# Token counter API

## API Endpoints

### GET /messages/
Returns the number of tokens used when given text input

#### FastAPI app:

Input encoding and message

Returns the encoding and the number of tokens used


#### Usage Tutorial
Use FastAPI - Swagger UI
`http://127.0.0.1:8000/docs`


Create a JWT Token to use protected app under `/token`
```json
  {
  "title": "string",
  "password": "string",
  "has_permission": true
  }
```
Paste token under `Authorize` at top of the page

Under `/protected_message/{model}`, enter model and message
```json 
  {
    "model": "gpt-4",
    "message": "this is a test"
  }
```

#### Response
```json
  {
    "token_encoding": "cl100k_base",
    "number_of_tokens_used": 4,
    "number_of_tokens_remaining": 8188
  }
```
