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
def get_all_resources(
    user_id: str,
    resource_svc: ResourceService = Depends(),
    user_svc: UserService = Depends(),
):
    subject = user_svc.get_user_by_uuid(user_id)

    return resource_svc.get_resource_by_user(subject)


@api.get("/{id}", response_model=Resource, tags=["Resource"])
def get__resource_by_id(
    user_id: str,
    id: int,
    resource_svc: ResourceService = Depends(),
    user_svc: UserService = Depends(),
):
    subject = user_svc.get_user_by_uuid(user_id)
    resource = resource_svc.get_resource_by_id(id)
    return resource


@api.post("", response_model=Resource, tags=["Resource"])
def create_resource(
    user_id: str,
    resource: Resource,
    resource_svc: ResourceService = Depends(),
    user_svc: UserService = Depends(),
):
    subject = user_svc.get_user_by_uuid(user_id)
    new_resource = resource_svc.create(subject, resource)
    return new_resource


@api.put("/{id}", response_model=Resource, tags=["Resource"])
def update_resource(
    resource_id: int,
    user_id: str,
    resource: Resource,
    resource_svc: ResourceService = Depends(),
    user_svc: UserService = Depends(),
):
    resource.id = resource_id

    subject = user_svc.get_user_by_uuid(user_id)
    updated_resource = resource_svc.update(subject, resource)
    return updated_resource


@api.delete("/{id}", response_model=Resource, tags=["Resource"])
def delete_resource_tag_by_id(
    resource_id: int,
    tag_id: int,
    user_id: str,
    resource_svc: ResourceService = Depends(),
    user_svc: UserService = Depends(),
):
    subject = user_svc.get_user_by_uuid(user_id)
    resource = resource_svc.get_resource_by_id(resource_id)
    tag = resource_svc._tag_service.get_tag_by_id(tag_id)

    resource_svc.remove_tag(subject, resource, tag)
    return resource_svc.get_resource_by_id(resource_id)


@api.delete("/{resource_id}", tags=["Resource"])
def delete_resource_by_id(
    resource_id: int,
    user_id: str,
    resource_svc: ResourceService = Depends(),
    user_svc: UserService = Depends(),
):
    subject = user_svc.get_user_by_uuid(user_id)
    resource = resource_svc.get_by_id(resource_id)
    resource_svc.delete(subject, resource)
    return


@api.get("/search/", response_model=List[Resource], tags=["Resource"])
def get_service_by_slug(
    slug: str,
    user_id: str,
    resource_svc: ResourceService = Depends(),
    user_svc: UserService = Depends(),
):
    subject = user_svc.get_user_by_uuid(user_id)
    return resource_svc.get_by_slug(subject, slug)


@api.get("/tag/{tag_id}", response_model=List[Resource], tags=["Resource"])
def get_resources_by_tag(tag_id: int, resource_svc: ResourceService = Depends()):
    return resource_svc.get_by_tag_id(tag_id)
