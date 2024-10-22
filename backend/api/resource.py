from fastapi import APIRouter, Depends
from ..services import ResourceService, UserService
from ..models.resource_model import Resource

from typing import List

api = APIRouter(prefix="/api/resource")

openapi_tags = {
    "name": "Resource",
    "description": "Resource search and related operations.",
}


# TODO: Add security using HTTP Bearer Tokens
# TODO: Enable authorization by passing user uuid to API
# TODO: Create custom exceptions
@api.get("", response_model=List[Resource], tags=["Resource"])
def get_all(
    user_id: str,
    resource_svc: ResourceService = Depends(),
    user_svc: UserService = Depends(),
):
    subject = user_svc.get_user_by_uuid(user_id)

    return resource_svc.get_resource_by_user(subject)
