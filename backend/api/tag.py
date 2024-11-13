from fastapi import APIRouter, Depends
from typing import List

from .authentication import registered_user
from backend.models.tag_model import Tag
from backend.models.user_model import User
from backend.services.tag import TagService

api = APIRouter(prefix="/api/tag")

openapi_tags = {
    "name": "Tag",
    "description": "Tag CRUD operations.",
}

@api.post("", response_model=Tag, tags=["Tag"])
def create(
    subject: User = Depends(registered_user), 
    tag: Tag = Depends(),
    tag_service: TagService = Depends(),
):
    return tag_service.create(subject, tag)

@api.get("", response_model=List[Tag], tags=["Tag"])
def get_all(
    subject: User = Depends(registered_user),  
    tag_svc: TagService = Depends()
):
    return tag_svc.get_all()

@api.put("", response_model=Tag, tags=["Tag"])
def update(
    subject: User = Depends(registered_user), 
    tag: Tag = Depends(),
    tag_svc: TagService = Depends(),
):
    return tag_svc.update(subject, tag)

@api.delete("", response_model=None, tags=["Tag"])
def delete(
    subject: User = Depends(registered_user), 
    tag: Tag = Depends(),
    tag_svc: TagService = Depends(),
):
    tag_svc.delete(subject, tag)