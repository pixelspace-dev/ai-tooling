import os
from dotenv import load_dotenv
from datetime import datetime, timedelta
import jwt
from fastapi import Depends, HTTPException, Request, status
from fastapi.security import HTTPBearer
from typing import Optional
from pydantic import BaseModel

load_dotenv()

# variables
password = os.getenv('PASSWORD')
secret_key = os.getenv('SECRET_KEY')
ALGORITHM = "HS256"

# Example user data
users = {
    "admin": {"title": "admin", "password": password, "has_permission": True},
}

# Define the user model
class User(BaseModel):
    title: str
    password: Optional[str] = None
    has_permission: Optional[bool] = None

# JWT Access token creation
def create_access_token(data: dict, expires_delta: timedelta = timedelta(days=1)):
    to_encode = data.copy()
    to_encode.update({"exp": datetime.utcnow() + expires_delta})
    encoded_jwt = jwt.encode(to_encode, secret_key, algorithm=ALGORITHM)
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
        payload = jwt.decode(token, secret_key, algorithms=[ALGORITHM])
        title = payload.get("sub")
    except jwt.PyJWTError:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid token or expiredtoken")

    if title is None:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail="Invalid token or expired token")

    user_dict = users.get(title)
    return User(**user_dict)