import jwt
from datetime import datetime, timedelta
from fastapi import Depends, HTTPException, status, APIRouter
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from backend.models.user_model import User
from ..services import UserService

auth_router = APIRouter()
api = APIRouter(prefix="/api/authentication")

openapi_tags = {
    "name": "Authentication",
    "description": "Authentication of users and distributes bearer tokens",
}

JWT_SECRET = "Sample Secret"
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(user_id: str) -> str:
    expiration = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
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

@auth_router.post("/api/authentication", tags=["Authentication"])
def return_bearer_token(user_id: str, user_service: UserService = Depends()):
    user = user_service.get_user_by_id(user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid user ID"
        )

    access_token = create_access_token(user_id=user_id)
    return {"access_token": access_token}

@auth_router.get("/api/authentication", tags=["Authentication"])
def get_user_id(user_service: UserService = Depends()):
    return user_service.all()