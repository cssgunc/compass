from typing import List
from fastapi import APIRouter, Depends

from backend.models.resource_model import Resource
from backend.models.service_model import Service
from backend.models.tag_model import Tag
from backend.services.resource import ResourceService
from backend.services.service import ServiceService
from backend.services.tag import TagService


api = APIRouter(prefix="/api/tag")

openapi_tags = {
    "name": "Tag",
    "description": "Tag getter and related operations.",
}


@api.get("", response_model=List[Tag], tags=["tags"])
def get_all_tags(tag_service: TagService = Depends()):
    return tag_service.all()
