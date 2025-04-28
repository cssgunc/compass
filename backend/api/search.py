from fastapi import APIRouter, Depends

from backend.services.search import SearchResult

from ..services import SearchService

api = APIRouter(prefix="/api/search")

openapi_tags = {
    "name": "Search",
    "description": "Search through all resources and services for a string.",
}

@api.get("", tags=["Search"])
def search(query: str, search_svc: SearchService = Depends()) -> list[SearchResult]:
    return search_svc.search(query)
  