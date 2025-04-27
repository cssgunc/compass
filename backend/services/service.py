from fastapi import Depends

from ..database import db_session
from sqlalchemy.orm import Session
from sqlalchemy import func, select, and_, func, or_, exists, or_

from backend.models.service_model import Service
from backend.models.user_model import User
from backend.entities.service_entity import ServiceEntity
from backend.models.enum_for_models import ProgramTypeEnum, UserTypeEnum
from backend.services.exceptions import (
    ServiceNotFoundException,
    ProgramNotAssignedException,
)


class ServiceService:

    def __init__(self, session: Session = Depends(db_session)):
        self._session = session

    def get_service_by_user(self, subject: User) -> list[Service]:
        """Resource method getting all of the resources that a user has access to based on role"""
        if subject.role != UserTypeEnum.VOLUNTEER:
            query = select(ServiceEntity).order_by(ServiceEntity.id)
            entities = self._session.scalars(query).all()
            return [service.to_model() for service in entities]
        else:
            programs = subject.program
            services = []
            for program in programs:
                entities = (
                    self._session.query(ServiceEntity)
                    .where(ServiceEntity.program == program)
                    .all()
                )
                for entity in entities:
                    services.append(entity.to_model())
        return [service for service in services]

    def get_service_by_name(self, name: str, subject: User) -> Service:
        """Service method getting services by id."""
        query = select(ServiceEntity).where(
            and_(ServiceEntity.name == name, ServiceEntity.program.in_(subject.program))
        )
        entity = self._session.scalars(query).one_or_none()

        if entity is None:
            raise ServiceNotFoundException(
                f"Service with name: {name} does not exist or program has not been assigned"
            )

        return entity.to_model()

    def create(self, subject: User, service: Service) -> Service:
        """Creates/adds a service to the table."""
        if subject.role != UserTypeEnum.ADMIN:
            raise ProgramNotAssignedException(
                f"User is not {UserTypeEnum.ADMIN}, cannot create service"
            )

        service_entity = ServiceEntity.from_model(service)
        self._session.add(service_entity)
        self._session.commit()
        return service_entity.to_model()

    def update(self, subject: User, service: Service) -> Service:
        """Updates a service if in the table."""
        if subject.role != UserTypeEnum.ADMIN:
            raise ProgramNotAssignedException(
                f"User is not {UserTypeEnum.ADMIN}, cannot update service"
            )

        query = select(ServiceEntity).where(ServiceEntity.id == service.id)
        entity = self._session.scalars(query).one_or_none()

        if entity is None:
            raise ServiceNotFoundException(
                "The service you are searching for does not exist."
            )

        entity.name = service.name if service.name else entity.name
        entity.status = service.status if service.status else entity.status
        entity.summary = service.summary if service.summary else entity.summary
        entity.requirements = (
            service.requirements if service.requirements else entity.requirements
        )
        entity.program = service.program if service.program else entity.program
        self._session.commit()

        return entity.to_model()

    def delete(self, subject: User, id: int) -> None:
        """Deletes a service from the table."""
        if subject.role != UserTypeEnum.ADMIN:
            raise ProgramNotAssignedException(f"User is not {UserTypeEnum.ADMIN}")

        query = select(ServiceEntity).where(ServiceEntity.id == id)
        entity = self._session.scalars(query).one_or_none()

        if entity is None:
            raise ServiceNotFoundException(
                "The service you are searching for does not exist."
            )

        self._session.delete(entity)
        self._session.commit()

        return {"message": "Service deleted successfully"}
