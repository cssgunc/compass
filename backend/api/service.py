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
    uuid: str,
    service: Service,
    user_svc: UserService = Depends(),
    service_svc: ServiceService = Depends(),
):
    subject = user_svc.get_user_by_uuid(uuid)
    return service_svc.create(subject, service)


@api.get("", response_model=List[Service], tags=["Service"])
def get_all(
    uuid: str,
    user_svc: UserService = Depends(),
    service_svc: ServiceService = Depends(),
):
    subject = user_svc.get_user_by_uuid(uuid)
    return service_svc.get_service_by_user(subject)


@api.get("/{name}", response_model=Service, tags=["Service"])
def get_by_name(
    name: str,
    uuid: str,
    user_svc: UserService = Depends(),
    service_svc: ServiceService = Depends(),
):
    subject = user_svc.get_user_by_uuid(uuid)
    return service_svc.get_service_by_name(name, subject)


@api.put("", response_model=Service, tags=["Service"])
def update(
    uuid: str,
    service: Service,
    user_svc: UserService = Depends(),
    service_svc: ServiceService = Depends(),
):
    subject = user_svc.get_user_by_uuid(uuid)
    return service_svc.update(subject, service)


@api.delete("", response_model=dict, tags=["Service"])
def delete(
    uuid: str,
    id: int,
    user_svc: UserService = Depends(),
    service_svc: ServiceService = Depends(),
):
    subject = user_svc.get_user_by_uuid(uuid)
    return service_svc.delete(subject, id)
