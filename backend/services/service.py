from fastapi import Depends

from ..database import db_session
from sqlalchemy.orm import Session
from sqlalchemy import func, select, and_, func, or_, exists, or_

from backend.models.service_model import Service
from backend.entities.service_entity import ServiceEntity
from ..enum_for_models import ProgramTypeEnum
from backend.services.exceptions import ServiceNotFoundException

class ServiceService:

    def __init__(self, session: Session = Depends(db_session)):
        self._session = session
    
    def get_service_by_program(self, program: ProgramTypeEnum) -> list[Service]:
        # get service by program type

        query = select(ServiceEntity).filter(ServiceEntity.program == program)
        entities = self._session.scalars(query)

        return [entity.to_model() for entity in entities]

    def get_service_by_name(self, name:str) -> Service:
        # get service by program type

        query = select(ServiceEntity).filter(ServiceEntity.name == name)
        entity = self._session.scalars(query).one_or_none

        if entity is None:
            raise ServiceNotFoundException("The service you are searching for does not exist.")

        return entity.to_model()
    
    def get_all(self) -> list[Service]:
        # get all of the services in the table
        table = select(ServiceEntity)
        entities = self._session.scalars(table).all()

        return [service.to_model() for service in entities]

    def create(self, service: Service) -> Service:
        # creates a new service
        service_entity = ServiceEntity.from_model(service)
        self._session.add(service_entity)
        self._session.commit()
        return service_entity.to_model()
    
    def update(self, service: Service) -> Service:
        # updates a service entity if it exists
        service_entity = self._session.get(ServiceEntity, service.id)

        if service_entity is None:
            raise ServiceNotFoundException("The service you are searching for does not exist.")
        
        service_entity.name = service.name
        service_entity.status = service.status
        service_entity.summary = service.summary
        service_entity.requirements = service.requirements
        service_entity.program = service.program

        self._session.commit()

        return service_entity.to_model()

    def delete(self, service: Service) -> None:
        service_entity = self._session.get(ServiceEntity, service.id)

        if service_entity is None:
            raise ServiceNotFoundException("The service you are searching for does not exist.")

        self._session.delete(service_entity)
        self._session.commit()