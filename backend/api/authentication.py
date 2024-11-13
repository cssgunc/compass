import jwt
from fastapi import Depends, HTTPException, Header, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from backend.models.user_model import User
from ..services import UserService

JWT_SECRET = "Sample Secret"
JWT_ALGORITHM = "HS256"

def registered_user(
    token: HTTPAuthorizationCredentials = Depends(HTTPBearer()),
    user_service: UserService = Depends()
) -> User:
    try:
        payload = jwt.decode(token.credentials, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user = user_service.get(payload["pid"])
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found",
            )
        return user
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )