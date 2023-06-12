import tiktoken
from datetime import datetime, timedelta
import jwt
from fastapi import Depends, HTTPException, Request, status
from fastapi.security import HTTPBearer
from typing import Optional
from pydantic import BaseModel

# Set the JWT Secret and the algorithm used
SECRET_KEY = "tokencounterforpixelspace123"
ALGORITHM = "HS256"

# Example user data
users = {
    "haley": {"username": "haley", "password": "pixelspac3", "has_permission": True},
}

# Define the user model
class User(BaseModel):
    username: str
    password: Optional[str] = None
    has_permission: Optional[bool] = None

# JWT Access token creation
def create_access_token(data: dict, expires_delta: timedelta = timedelta(days=1)):
    to_encode = data.copy()
    to_encode.update({"exp": datetime.utcnow() + expires_delta})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


# Custom AuthenticationService class
class AuthenticationService(HTTPBearer):
    def __init__(self, scheme_name="Bearer", auto_error=True):
        super().__init__(scheme_name=scheme_name, auto_error=auto_error)

auth_service = AuthenticationService()

# Verify token function using Request object and AuthenticationService
def verify_token(request: Request, token: str = Depends(auth_service)):
    authorization: str = request.headers.get("Authorization")
    if not authorization:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated"
        )

    scheme, token = authorization.split()
    if scheme.lower() != "bearer":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token scheme"
        )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
    except jwt.PyJWTError:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid token or expiredtoken")

    if username is None:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail="Invalid token or expired token")

    user_dict = users.get(username)
    return User(**user_dict)

#get_number_tokens_from_openai takes an input message and an encoding, and returns the number of tokens used
#this uses tiktoken, from openai
def get_number_tokens_from_openai(input: str, encoding: str) -> int:
    tokens = tiktoken.get_encoding(encoding).encode(input)
    return len(tokens)

#get number of tokens used and the model and returns the remaining number of tokens
def how_many_tokens_remaining_as_int(tokens_used: int, model: str) -> int:
    token_limits = {
        "gpt-4": 8192,
        "gpt-4-32k": 32768,
        "gpt-3.5": 4096,
        "gpt-3.5 (code-davinci-002)": 8001,
        "gpt-3": 2049,
    }

    return token_limits.get(model, -1) - tokens_used

# chooses an encode based on the chosen chat model
# there are different versoions of gpt 3.5 that use different encoders - from tiktoken in model.py
def set_encoder(model: str) -> str:
    model_options = {
        "gpt-4": "cl100k_base",
        "gpt-4-32k": "cl100k_base",
        "gpt-3.5 (code-davinci-002)": "p50k_base",
        "gpt-3": "r50k_base",
    }
    return model_options.get(model, "cl100k_base")


