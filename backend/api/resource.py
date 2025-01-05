from fastapi import APIRouter, Depends

from backend.models.user_model import User
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
@api.post("", response_model=Resource, tags=["Resource"])
def create(
    uuid: str,
    resource: Resource,
    user_svc: UserService = Depends(),
    resource_svc: ResourceService = Depends(),
):
    subject = user_svc.get_user_by_uuid(uuid)
    return resource_svc.create(subject, resource)


@api.get("", response_model=List[Resource], tags=["Resource"])
def get_all(
    uuid: str,
    user_svc: UserService = Depends(),
    resource_svc: ResourceService = Depends(),
):
    subject = user_svc.get_user_by_uuid(uuid)
    return resource_svc.get_resource_by_user(subject)


@api.get("/{name}", response_model=Resource, tags=["Resource"])
def get_by_name(
    name: str,
    uuid: str,
    user_svc: UserService = Depends(),
    resource_svc: ResourceService = Depends(),
):
    subject = user_svc.get_user_by_uuid(uuid)
    return resource_svc.get_resource_by_name(name, subject)


@api.put("", response_model=Resource, tags=["Resource"])
def update(
    uuid: str,
    resource: Resource,
    user_svc: UserService = Depends(),
    resource_svc: ResourceService = Depends(),
):
    subject = user_svc.get_user_by_uuid(uuid)
    return resource_svc.update(subject, resource)


@api.delete("", response_model=None, tags=["Resource"])
def delete(
    uuid: str,
    resource: Resource,
    user_svc: UserService = Depends(),
    resource_svc: ResourceService = Depends(),
):
    subject = user_svc.get_user_by_uuid(uuid)
    resource_svc.delete(subject, resource)
