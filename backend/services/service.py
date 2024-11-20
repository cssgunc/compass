from typing import List
from fastapi import Depends

from backend.entities.service_tag_entity import ServiceTagEntity
from backend.entities.tag_entity import TagEntity

from ..database import db_session
from sqlalchemy.orm import Session
from sqlalchemy import func, select, and_, func, or_, exists, or_, any_

from backend.models.service_model import Service
from backend.models.user_model import User
from backend.entities.service_entity import ServiceEntity
from backend.models.enum_for_models import ProgramTypeEnum, UserTypeEnum
from backend.services.exceptions import (
    ServiceNotFoundException,
    ProgramNotAssignedException,
)
from backend.services.tag import TagService
from ..models import Tag


class ServiceService:

    def __init__(
        self,
        session: Session = Depends(db_session),
        tag_service: TagService = Depends(),
    ):
        self._session = session
        self._tag_service = tag_service

    def get_service_by_program(self, program: ProgramTypeEnum) -> list[Service]:
        """Service method getting services belonging to a particular program."""
        query = select(ServiceEntity).filter(ServiceEntity.program == program)
        entities = self._session.scalars(query)

        return [entity.to_model() for entity in entities]

    def get_service_by_id(self, id: int) -> Service:
        """Service method getting services by id."""
        query = select(ServiceEntity).filter(ServiceEntity.id == id)
        entity = self._session.scalars(query).one_or_none()

        if entity is None:
            raise ServiceNotFoundException(f"Service with id: {id} does not exist")
        service = entity.to_model()
        return service

    def get_service_by_name(self, name: str) -> Service:
        """Service method getting services by id."""
        query = select(ServiceEntity).filter(ServiceEntity.name == name)
        entity = self._session.scalars(query).one_or_none()

        if entity is None:
            raise ServiceNotFoundException(f"Service with name: {name} does not exist")

        service = entity.to_model()
        return service

    def get_service_by_slug(self, search_str: str) -> List[Service]:
        """Service method getting services by slug."""
        query = select(ServiceEntity).filter(
            or_(
                ServiceEntity.name.ilike(f"%{search_str}%"),
                ServiceEntity.status.ilike(f"%{search_str}%"),
                ServiceEntity.summary.ilike(f"%{search_str}%"),
                any_(ServiceEntity.requirements).ilike(f"%{search_str}%"),
            )
        )
        entity = self._session.scalars(query).all()

        return [service.to_model() for service in entity]

    def get_service_by_user(self, subject: User):
        """Service method getting all of the services that a user has access to based on role"""
        if subject.role != UserTypeEnum.VOLUNTEER:
            entities = self._session.query(ServiceEntity).all()

            return [service.to_model() for service in entities]
        else:
            programs = subject.program
            services = []
            for program in programs:
                query = select(ServiceEntity).filter(ServiceEntity.program == program)
                entities = self._session.scalars(query).all()
                for entity in entities:
                    services.append(entity)

            return [service.to_model() for service in services]

    def get_all(self, subject: User) -> list[Service]:
        """Service method retrieving all of the services in the table."""
        if subject.role == UserTypeEnum.VOLUNTEER:
            raise ProgramNotAssignedException(
                f"User is not {UserTypeEnum.ADMIN} or {UserTypeEnum.VOLUNTEER}, cannot get all"
            )

        entities = self._session.query(ServiceEntity).all()
        services = [service.to_model() for service in entities]
        return services

    def create(self, subject: User, service: Service) -> Service:
        """Creates/adds a service to the table."""
        if subject.role != UserTypeEnum.ADMIN:
            raise ProgramNotAssignedException(
                f"User is not {UserTypeEnum.ADMIN}, cannot create service"
            )

        service_entity = ServiceEntity.from_model(service)
        self._session.add(service_entity)
        self._session.flush()

        for tag in service.tags:
            tag_entity = self._tag_service.get_or_create_tag(tag.content)
            self._tag_service.add_tag_service(
                subject, tag_entity, ServiceEntity.to_model(service_entity)
            )

        self._session.commit()
        return service_entity.to_model()

    def update(self, subject: User, service: Service) -> Service:
        """Updates a service if in the table."""
        if subject.role != UserTypeEnum.ADMIN:
            raise ProgramNotAssignedException(
                f"User is not {UserTypeEnum.ADMIN}, cannot update service"
            )

        service_entity = (
            self._session.query(ServiceEntity)
            .filter(ServiceEntity.id == service.id)
            .one_or_none()
        )

        self._tag_service.delete_all_tags_service(service)

        if service_entity is None:
            raise ServiceNotFoundException(
                "The service you are searching for does not exist."
            )

        service_entity.name = service.name
        service_entity.status = service.status
        service_entity.summary = service.summary
        service_entity.requirements = service.requirements
        service_entity.program = service.program

        for tag in service.tags:
            tag_entity = self._tag_service.get_or_create_tag(tag.content)
            self._tag_service.add_tag_service(
                subject, tag_entity, ServiceEntity.to_model(service_entity)
            )

        self._session.commit()
        return service_entity.to_model()

    def delete(self, subject: User, service: Service) -> None:
        """Deletes a service from the table."""
        if subject.role != UserTypeEnum.ADMIN:
            raise ProgramNotAssignedException(f"User is not {UserTypeEnum.ADMIN}")
        service_entity = (
            self._session.query(ServiceEntity)
            .filter(ServiceEntity.id == service.id)
            .one_or_none()
        )
        if service_entity is None:
            raise ServiceNotFoundException(
                "The service you are searching for does not exist."
            )
        if self._tag_service.get_tags_for_service(service).count(Tag) != 0:
            self._tag_service.delete_all_tags_service(service)

        self._session.delete(service_entity)
        self._session.commit()

    def get_service_by_tag_id(self, tag_id: int) -> List[Service]:
        service_ids = self._tag_service.get_all_services_by_tagid(tag_id)
        services = []
        for id in service_ids:
            services.append(self.get_service_by_id(id))
        return services

    """
    Can be used, but both methods are achieved by update.

    def add_tag(self, subject: User, service: Service, tag: Tag):
        service = self.get_service_by_id(service.id)
        tag = self._tag_service.get_tag_by_id(tag.id)
        self._tag_service.add_tag_service(subject, service.id, tag.id)

    def remove_tag(self, subject: User, service: Service, tag: Tag) -> None:
        serviceEntity = self.get_service_by_id(service.id)
        tagEntity = self._tag_service.get_tag_by_id(tag.id)
        self._tag_service.delete_tag_service(subject, tagEntity, serviceEntity)
    """
