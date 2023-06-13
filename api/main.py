from datetime import timedelta
from fastapi import FastAPI, Depends, HTTPException, status
from authorization import (User,
                           create_access_token, 
                           verify_token,
                           users,
)
from token_counter import  (get_number_tokens_from_openai,
                           how_many_tokens_remaining_as_int,
                           set_encoder
)

app = FastAPI()

#this provides the default message that can be seen upon running the app
@app.get("/")
async def default_message():
    return {"Protected": "Tokenizer that takes Chat Completion Model and Message"}

# Authenticate a user and return the appropriate access token
@app.post("/token", tags=["Authentication"])
async def login(user: User):
    if user.title not in users or users[user.title]["password"] != user.password:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Username or password is incorrect")
   
    has_permission = users[user.title].get("has_permission", False)

    access_token_expires = timedelta(minutes=15)
    access_token = create_access_token(data={"sub": user.title, "has_permission": has_permission}, expires_delta=access_token_expires)

    return {"access_token": access_token, "token_type": "bearer"}

# Protected route accessible only to authenticated users
@app.get("/protected_message/{model}", tags=["Protected Routes"])
async def process_message(model: str, message: str, current_user: User = Depends(verify_token), ):
    
    encoder = set_encoder(model)

    number_tokens_used = get_number_tokens_from_openai(message, encoder)

    leftover_tokens = how_many_tokens_remaining_as_int(number_tokens_used, model)

    return {"token_encoding": encoder, 
            "number_of_tokens_used": number_tokens_used,
            "number_of_tokens_remaining": leftover_tokens}