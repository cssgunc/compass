from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from decoder import decode_token

from backend.models.user_model import User
from ..services import ServiceService, UserService
from ..models.service_model import Service

from typing import List

api = APIRouter(prefix="/api/service")

openapi_tags = {
    "name": "Service",
    "description": "Service search and related operations.",
}

# Creates an OAuth instance
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_current_user(token: str = Depends(oauth2_scheme)) -> User:
    user = decode_token(token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user

# TODO: Add security using HTTP Bearer Tokens
# TODO: Enable authorization by passing user uuid to API
# TODO: Create custom exceptions
@api.post("", response_model=Service, tags=["Service"])
def create(
    subject: User = Depends(getUser),
    service: Service,
    service_svc: ServiceService = Depends()
):
    return service_svc.create(subject, service)


@api.get("", response_model=List[Service], tags=["Service"])
def get_all(
    subject: User = Depends(getUser),
    service_svc: ServiceService = Depends()
):
    return service_svc.get_service_by_user(subject)

@api.put("", response_model=Service, tags=["Service"])
def update(
    subject: User = Depends(getUser),
    service: Service,
    service_svc: ServiceService = Depends()
):
    return service_svc.update(subject, service)

@api.delete("", response_model=None, tags=["Service"])
def delete(
    subject: User = Depends(getUser),
    service: Service,
    service_svc: ServiceService = Depends()
):
    service_svc.delete(subject, service)
