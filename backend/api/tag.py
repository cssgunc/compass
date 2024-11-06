from fastapi import APIRouter, Depends

from backend.models.tag_model import Tag
from backend.models.user_model import User
from backend.services.tag import TagService
from ..services import ResourceService, UserService
from ..models.resource_model import Resource

from typing import List

api = APIRouter(prefix="/api/tag")

openapi_tags = {
    "name": "Tag",
    "description": "Tag CRUD operations.",
}


# TODO: Add security using HTTP Bearer Tokens
# TODO: Enable authorization by passing user uuid to API
# TODO: Create custom exceptions
@api.post("", response_model=Tag, tags=["Tag"])
def create(
    subject: User,
    tag: Tag,
    tag_service: TagService=Depends()
):
    return tag_service.create(subject, tag)

@api.get("", response_model=List[Tag], tags=["Tag"])
def get_all(
    subject: User,
    tag_svc: TagService=Depends()
):
    return tag_svc.get_all()

@api.put("", response_model=Tag, tags=["Tag"])
def update(
    subject: User,
    tag: Tag,
    tag_svc: TagService=Depends()
):
    return tag_svc.delete(subject, tag)

@api.delete("", response_model=None, tags=["Tag"])
def delete(
    subject: User,
    tag: Tag,
    tag_svc: TagService=Depends()
):
    tag_svc.delete(subject, tag)
