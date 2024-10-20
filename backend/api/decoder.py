# token_utils.py
import jwt
from jwt import PyJWTError
from fastapi import HTTPException, status
from workspace.backend.models.user_model import User
from ..services import UserService 

SECRET = "SECRET_KEY"
ALGORITHM = "HS256"

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