from fastapi import APIRouter, Depends, HTTPException
from ..services import ServiceService, UserService, TagService
from ..models import Service, Tag

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


@api.get("/{id}", response_model=Service, tags=["Service"])
def get_by_id(
    user_id: str,
    id: int,
    service_svc: ServiceService = Depends(),
    user_svc: UserService = Depends(),
):
    subject = user_svc.get_user_by_uuid(user_id)
    service = service_svc.get_service_by_id(id)
    return service


@api.post("/", response_model=Service, tags=["Service"])
def create_service(
    user_id: str,
    service: Service,
    service_svc: ServiceService = Depends(),
    user_svc: UserService = Depends(),
):
    subject = user_svc.get_user_by_uuid(user_id)
    new_service = service_svc.create(subject, service)
    return new_service


@api.put("/{service_id}", response_model=Service, tags=["Service"])
def update_service(
    service_id: int,
    user_id: str,
    service: Service,
    service_svc: ServiceService = Depends(),
    user_svc: UserService = Depends(),
):
    service.id = service_id

    subject = user_svc.get_user_by_uuid(user_id)
    updated_service = service_svc.update(subject, service)
    return updated_service


@api.delete("/{service_id}", response_model=Service, tags=["Service"])
def delete_service_tag_by_id(
    service_id: int,
    tag_id: int,
    user_id: str,
    service_svc: ServiceService = Depends(),
    user_svc: UserService = Depends(),
):
    subject = user_svc.get_user_by_uuid(user_id)
    service = service_svc.get_service_by_id(service_id)
    tag = service_svc._tag_service.get_tag_by_id(tag_id)

    service_svc.remove_tag(subject, service, tag)
    return service_svc.get_service_by_id(service_id)
