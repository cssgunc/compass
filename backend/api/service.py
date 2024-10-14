from fastapi import APIRouter, Depends
from ..services import ServiceService, UserService
from ..models.service_model import Service

from typing import List

api = APIRouter(prefix="/api/service")

openapi_tags = {
    "name": "Service",
    "description": "Service search and related operations.",
}


# TODO: Add security using HTTP Bearer Tokens
# TODO: Enable authorization by passing user uuid to API
# TODO: Create custom exceptions
@api.get("", response_model=List[Service], tags=["Service"])
def get_all(
    user_id: str,
    service_svc: ServiceService = Depends(),
    user_svc: UserService = Depends(),
):
    subject = user_svc.get_user_by_uuid(user_id)

    return service_svc.get_service_by_user(subject)
