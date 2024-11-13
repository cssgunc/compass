from fastapi import APIRouter, Depends, HTTPException, status
from typing import List

from .authentication import registered_user
from backend.models.user_model import User
from ..services import ResourceService
from ..models.resource_model import Resource

api = APIRouter(prefix="/api/resource")

openapi_tags = {
    "name": "Resource",
    "description": "Resource search and related operations.",
}

@api.post("", response_model=Resource, tags=["Resource"])
def create(
    subject: User = Depends(registered_user), 
    resource: Resource = Depends(),
    resource_svc: ResourceService = Depends(),
):
    return resource_svc.create(subject, resource)

@api.get("", response_model=List[Resource], tags=["Resource"])
def get_all(
    subject: User = Depends(registered_user),
    resource_svc: ResourceService = Depends()
):
    return resource_svc.get_resource_by_user(subject)

@api.put("", response_model=Resource, tags=["Resource"])
def update(
    subject: User = Depends(registered_user), 
    resource: Resource = Depends(),
    resource_svc: ResourceService = Depends(),
):
    return resource_svc.update(subject, resource)

@api.delete("", response_model=None, tags=["Resource"])
def delete(
    subject: User = Depends(registered_user),
    resource: Resource = Depends(),
    resource_svc: ResourceService = Depends(),
):
    resource_svc.delete(subject, resource)