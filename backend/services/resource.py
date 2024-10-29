from fastapi import Depends
from ..database import db_session
from sqlalchemy.orm import Session
from sqlalchemy import and_, select
from ..models.resource_model import Resource
from ..entities.resource_entity import ResourceEntity
from ..models.user_model import User, UserTypeEnum

from .exceptions import ProgramNotAssignedException, ResourceNotFoundException


class ResourceService:

    def __init__(self, session: Session = Depends(db_session)):
        self._session = session

    def get_resource_by_user(self, subject: User) -> list[Resource]:
        """Resource method getting all of the resources that a user has access to based on role"""
        if subject.role != UserTypeEnum.VOLUNTEER:
            query = select(ResourceEntity)
            entities = self._session.scalars(query).all()
            return [resource.to_model() for resource in entities]
        else:
            programs = subject.program
            resources = []
            for program in programs:
                entities = (
                    self._session.query(ResourceEntity)
                    .where(ResourceEntity.program == program)
                    .all()
                )
                for entity in entities:
                    resources.append(entity.to_model())
        return [resource for resource in resources]

    def get_resource_by_name(self, name: str, subject: User) -> Resource:
        """Get a resource by name."""
        query = select(ResourceEntity).where(
            and_(
                ResourceEntity.name == name, ResourceEntity.program.in_(subject.program)
            )
        )
        entity = self._session.scalars(query).one_or_none()
        if entity is None:
            raise ResourceNotFoundException(
                f"Resource with name: {name} does not exist or program has not been assigned."
            )
        return entity.to_model()

    def create(self, subject: User, resource: Resource) -> Resource:
        """
        Creates a resource based on the input object and adds it to the table if the user has the right permissions.

        Parameters:
            user: a valid User model representing the currently logged in User
            resource: Resource object to add to table

        Returns:
            Resource: Object added to table
        """
        if subject.role != UserTypeEnum.ADMIN:
            raise ProgramNotAssignedException(
                f"User is not {UserTypeEnum.ADMIN}, cannot update service"
            )
        resource_entity = ResourceEntity.from_model(resource)
        self._session.add(resource_entity)
        self._session.commit()
        return resource_entity.to_model()

    def update(self, subject: User, resource: Resource) -> Resource:
        """
        Update the resource if the user has access

        Parameters:
            user: a valid User model representing the currently logged in User
            resource (ResourceEntity): Resource to update

        Returns:
            Resource: Updated resource object

        Raises:
            ResourceNotFoundException: If no resource is found with the corresponding ID
        """
        if subject.role != UserTypeEnum.ADMIN:
            raise ProgramNotAssignedException(
                f"User is not {UserTypeEnum.ADMIN}, cannot update service"
            )
        query = select(ResourceEntity).where(ResourceEntity.id == resource.id)
        entity = self._session.scalars(query).one_or_none()
        if entity is None:
            raise ResourceNotFoundException(
                f"No resource found with matching id: {resource.id}"
            )
        entity.name = resource.name
        entity.summary = resource.summary
        entity.link = resource.link
        entity.program = resource.program
        self._session.commit()
        return entity.to_model()

    def delete(self, subject: User, resource: Resource) -> None:
        """
        Delete resource based on id that the user has access to

        Parameters:
            user: a valid User model representing the currently logged in User
            id: int, a unique resource id

        Raises:
            ResourceNotFoundException: If no resource is found with the corresponding id
        """
        if subject.role != UserTypeEnum.ADMIN:
            raise ProgramNotAssignedException(
                f"User is not {UserTypeEnum.ADMIN}, cannot update service"
            )
        query = select(ResourceEntity).where(ResourceEntity.id == resource.id)
        entity = self._session.scalars(query).one_or_none()
        if entity is None:
            raise ResourceNotFoundException(
                f"No resource found with matching id: {resource.id}"
            )
        self._session.delete(entity)
        self._session.commit()
