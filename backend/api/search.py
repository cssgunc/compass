from fastapi import APIRouter, Depends

from ..services import SearchService
from ..models.resource_model import Resource
from ..models.service_model import Service


api = APIRouter(prefix="/api/search")

openapi_tags = {
    "name": "Search",
    "description": "Search through all resources and services for a string.",
}

@api.post("", tags=["Search"])
def search(query: str, search_svc: SearchService = Depends()) -> list[Resource | Service]:
    return search_svc.search(query)
  