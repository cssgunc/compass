from fastapi import APIRouter, Depends
from ..services import UserService
from ..models.user_model import User, UserTypeEnum

from typing import List

api = APIRouter(prefix="/api/user")

openapi_tags = {
    "name": "Users",
    "description": "User profile search and related operations.",
}


# TODO: Add security using HTTP Bearer Tokens
# TODO: Enable authorization by passing user uuid to API
# TODO: Create custom exceptions
@api.get("/all", response_model=List[User], tags=["Users"])
def get_all(uuid: str, user_svc: UserService = Depends()):
    subject = user_svc.get_user_by_uuid(uuid)

    if subject.role != UserTypeEnum.ADMIN:
        raise Exception(f"Insufficient permissions for user {subject.uuid}")

    return user_svc.all()


@api.get("/{uuid}", response_model=User, tags=["Users"])
def get_by_uuid(uuid: str, user_svc: UserService = Depends()):
    return user_svc.get_user_by_uuid(uuid)


@api.post("/", response_model=User, tags=["Users"])
def create_user(uuid: str, user: User, user_svc: UserService = Depends()):
    subject = user_svc.get_user_by_uuid(uuid)
    if subject.role != UserTypeEnum.ADMIN:
        raise Exception(f"Insufficient permissions for user {subject.uuid}")

    return user_svc.create(user)


@api.put("/", response_model=User, tags=["Users"])
def update_user(uuid: str, user: User, user_svc: UserService = Depends()):
    subject = user_svc.get_user_by_uuid(uuid)
    if subject.role != UserTypeEnum.ADMIN:
        raise Exception(f"Insufficient permissions for user {subject.uuid}")

    return user_svc.update(user)
