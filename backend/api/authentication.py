import jwt
from datetime import datetime, timedelta, timezone
from fastapi import Depends, HTTPException, Request, Response, status, APIRouter
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from backend.models.user_model import User
from backend.services import UserService
from backend.env import getenv

api = APIRouter(prefix="/api/authentication")

openapi_tags = {
    "name": "Authentication",
    "description": "Authentication of users and distributes bearer tokens",
}

JWT_SECRET = getenv("JWT_SECRET")
JWT_ALGORITHM = getenv("JWT_ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = getenv("ACCESS_TOKEN_EXPIRE_MINUTES")
REFRESH_TOKEN_EXPIRE_DAYS = getenv("REFRESH_TOKEN_EXPIRE_DAYS")

def create_access_token(user_id: str) -> str:
    expiration = datetime.now(timezone.utc) + timedelta(minutes=int(ACCESS_TOKEN_EXPIRE_MINUTES))
    payload = {"user_id": user_id, "exp": expiration}
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return token

def create_refresh_token(user_id: str) -> str:
    expiration = datetime.now(timezone.utc) + timedelta(days=int(REFRESH_TOKEN_EXPIRE_DAYS))
    payload = {"user_id": user_id, "exp": expiration}
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return token

def registered_user(
    request: Request,
    user_service: UserService = Depends()
) -> User:
    access_token = request.cookies.get("access_token")

    if not access_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing access token"
        )

    try:
        payload = jwt.decode(access_token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user_id = payload.get("user_id")
        
        user = user_service.get_user_by_id(user_id)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found"
            )
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token expired"
        )
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )

@api.post("", tags=["Authentication"])
def return_bearer_token(user_id: str, response: Response, user_service: UserService = Depends()):
    user = user_service.get_user_by_id(user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid user ID"
        )

    access_token = create_access_token(user_id)
    refresh_token = create_refresh_token(user_id)

    response.set_cookie(
        key="access_token", value=access_token, httponly=True, secure=True, max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60
    )
    response.set_cookie(
        key="refresh_token", value=refresh_token, httponly=True, secure=True, max_age=REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60
    )

    return {"message": "Tokens set as cookies"}

@api.get("", tags=["Authentication"])
def get_user_id(user_service: UserService = Depends()):
    return user_service.all()