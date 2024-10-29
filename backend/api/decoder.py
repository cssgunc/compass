# token_utils.py
import jwt
from jwt import PyJWTError
from datetime import datetime, timedelta
from fastapi import HTTPException, status, Depends
from backend.models.user_model import User
from ..services import UserService
from passlib.context import CryptContext

from supabase import create_client, Client

# Supabase configuration
SUPABASE_URL = "placeholder"
SUPABASE_KEY = "sample key"
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

SECRET = "SECRET_KEY"
ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def create_bearer_token(user_uuid: str, expires_delta: timedelta = None) -> str:
    if expires_delta:
        expire = datetime.now(datetime.UTC) + expires_delta
    else:
        expire = datetime.now(datetime.UTC) + timedelta(minutes=180)

    to_encode = {
        "sub": user_uuid,
        "exp": expire,
    }

    token = jwt.encode(to_encode, SECRET, algorithm=ALGORITHM)

    expires_at = expire.isoformat()
    token_data = {
        "user_uuid": user_uuid,
        "token": token,
        "expires_at": expires_at,
    }

    response = supabase.table("user_tokens").insert(token_data).execute()


def decode_token(token: str) -> User:
    try:
        payload = jwt.decode(token, SECRET, algorithms=[ALGORITHM])
        user_uuid = payload.get("sub")
        if user_uuid is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )

        user_data = UserService.get_user_by_uuid(user_uuid)
        if user_data is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found",
                headers={"WWW-Authenticate": "Bearer"},
            )

        user = User(
            id=user_data.id,
            username=user_data.username,
            email=user_data.email,
            experience=user_data.experience,
            group=user_data.group,
            program=user_data.program,
            role=user_data.role,
            created_at=user_data.created_at,
            uuid=user_data.uuid,
        )

        return user
    except PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )
