from fastapi import APIRouter, Depends, HTTPException, status
from typing import List

from .authentication import registered_user
from backend.models.user_model import User
from ..services import ServiceService
from ..models.service_model import Service

api = APIRouter(prefix="/api/service")

openapi_tags = {
    "name": "Service",
    "description": "Service search and related operations.",
}

@api.post("", response_model=Service, tags=["Service"])
def create(
    subject: User = Depends(registered_user),  
    service: Service = Depends(),
    service_svc: ServiceService = Depends(),
):
    return service_svc.create(subject, service)

@api.get("", response_model=List[Service], tags=["Service"])
def get_all(
    subject: User = Depends(registered_user), 
    service_svc: ServiceService = Depends()
):
    return service_svc.get_service_by_user(subject)

@api.put("", response_model=Service, tags=["Service"])
def update(
    subject: User = Depends(registered_user), 
    service: Service = Depends(),
    service_svc: ServiceService = Depends(),
):
    return service_svc.update(subject, service)

@api.delete("", response_model=None, tags=["Service"])
def delete(
    subject: User = Depends(registered_user),  
    service: Service = Depends(),
    service_svc: ServiceService = Depends(),
):
    service_svc.delete(subject, service)