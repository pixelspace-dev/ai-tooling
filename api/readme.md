## You may delete this initial readme.md file if you wish

## API Endpoints

### GET /api/tokens

Returns the number of tokens used when given text input

Returns the number...

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
