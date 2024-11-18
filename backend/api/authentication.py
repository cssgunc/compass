from typing import Annotated

from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from backend.models.user_model import User

api = APIRouter(prefix="/api/auth")

openapi_tags = {
    "name": "Authentication",
    "description": "Authentication and authorization handling.",
}

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def decode_token(token):
    """To implement later. Payload for JWT will be a User object returned by this function."""
    return token

async def get_user(token: Annotated[str, Depends(oauth2_scheme)]):
    user = decode_token(token)
    return user

@api.get("/user")
async def get_subject(subject: Annotated[User, Depends(get_user)]):
    return subject