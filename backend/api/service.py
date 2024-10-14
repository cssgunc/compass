from fastapi import APIRouter, Depends

from backend.models.user_model import User
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
@api.post("", response_model=Service, tags=["Service"])
def create(
    subject: User,
    service: Service,
    service_svc: ServiceService = Depends()
):
    return service_svc.create(subject, service)


@api.get("", response_model=List[Service], tags=["Service"])
def get_all(
    subject: User,
    service_svc: ServiceService = Depends()
):
    return service_svc.get_service_by_user(subject)

@api.put("", response_model=Service, tags=["Service"])
def update(
    subject: User,
    service: Service,
    service_svc: ServiceService = Depends()
):
    return service_svc.update(subject, service)

@api.delete("", response_model=None, tags=["Service"])
def delete(
    subject: User,
    service: Service,
    service_svc: ServiceService = Depends()
):
    service_svc.delete(subject, service)
