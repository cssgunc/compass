from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from decoder import decode_token

from workspace.backend.models.user_model import User
from ..services import ResourceService, UserService
from ..models.resource_model import Resource

from typing import List

api = APIRouter(prefix="/api/resource")

openapi_tags = {
    "name": "Resource",
    "description": "Resource search and related operations.",
}

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
@api.post("", response_model=Resource, tags=["Resource"])
def create(
    subject: User = Depends(get_current_user),
    resource: Resource, 
    resource_svc: ResourceService = Depends()
):
    return resource_svc.create(subject, resource)


@api.get("", response_model=List[Resource], tags=["Resource"])
def get_all(
    subject: User = Depends(get_current_user), 
    resource_svc: ResourceService = Depends()):
    return resource_svc.get_resource_by_user(subject)


@api.put("", response_model=Resource, tags=["Resource"])
def update(
    subject: User = Depends(get_current_user), 
    resource: Resource, 
    resource_svc: ResourceService = Depends()
):
    return resource_svc.update(subject, resource)


@api.delete("", response_model=None, tags=["Resource"])
def delete(
    subject: User = Depends(get_current_user), 
    resource: Resource, 
    resource_svc: ResourceService = Depends()
):
    resource_svc.delete(subject, resource)
