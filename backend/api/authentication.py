import jwt
from datetime import datetime, timedelta, timezone
from fastapi import Cookie, Depends, HTTPException, Response, status, APIRouter
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from backend.env import getenv
from backend.models.user_model import User
from ..services import UserService

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
    expiration = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {"user_id": user_id, "exp": expiration}
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return token

def create_refresh_token(user_id: str) -> str:
    expiration = datetime.now(timezone.utc) + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    payload = {"user_id": user_id, "exp": expiration}
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return token

def registered_user(
    token: HTTPAuthorizationCredentials = Depends(HTTPBearer()),
    user_service: UserService = Depends()
) -> User:
    try:
        payload = jwt.decode(token.credentials, JWT_SECRET, algorithms=[JWT_ALGORITHM])
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

@api.post("", include_in_schema=False, tags=["Authentication"])
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

@api.post("/refresh", tags=["Authentication"])
def refresh_access_token(response: Response, refresh_token: str = Depends(Cookie(None))):
    try:
        payload = jwt.decode(refresh_token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user_id = payload.get("user_id")
        if not user_id:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")

        new_access_token = create_access_token(user_id)

        response.set_cookie(
            key="access_token", value=new_access_token, httponly=True, secure=True, max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60
        )
        return {"message": "Access token refreshed"}

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Refresh token expired")
    except jwt.PyJWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")

@api.get("", include_in_schema=False, tags=["Authentication"])
def get_user_id(user_service: UserService = Depends()):
    return user_service.all()