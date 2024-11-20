from typing import List
from fastapi import Depends

from backend.services.tag import TagService
from ..database import db_session
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_, select
from ..models.resource_model import Resource
from ..entities.resource_entity import ResourceEntity
from ..models.user_model import User, UserTypeEnum, ProgramTypeEnum

from .exceptions import ProgramNotAssignedException, ResourceNotFoundException


class ResourceService:

    def __init__(
        self,
        session: Session = Depends(db_session),
        tag_service: TagService = Depends(),
    ):
        self._session = session
        self._tag_service = tag_service

    def get_resource_by_user(self, subject: User):
        """Resource method getting all of the resources that a user has access to based on role"""
        if subject.role != UserTypeEnum.VOLUNTEER:
            query = select(ResourceEntity)
            entities = self._session.scalars(query).all()

            return [resource.to_model() for resource in entities]
        else:
            programs = subject.program
            resources = []
            for program in programs:
                query = select(ResourceEntity).filter(ResourceEntity.program == program)
                entities = self._session.scalars(query).all()
                for entity in entities:
                    resources.append(entity)

            return [resource.to_model() for resource in resources]

    def create(self, user: User, resource: Resource) -> Resource:
        """
        Creates a resource based on the input object and adds it to the table if the user has the right permissions.

        Parameters:
            user: a valid User model representing the currently logged in User
            resource: Resource object to add to table

        Returns:
            Resource: Object added to table
        """
        if user.role != UserTypeEnum.ADMIN:
            raise ProgramNotAssignedException(
                f"User is not {UserTypeEnum.ADMIN}, cannot update resource"
            )

        resource_entity = ResourceEntity.from_model(resource)
        self._session.add(resource_entity)
        self._session.flush()

        for tag in resource.tags:
            tag_entity = self._tag_service.get_or_create_tag(tag.content)
            self._tag_service.add_tag_resource(
                user, tag_entity, ResourceEntity.to_model(resource_entity)
            )

        self._session.commit()
        return resource_entity.to_model()

    def get_by_id(self, user: User, id: int) -> Resource:
        """
        Gets a resource based on the resource id that the user has access to

        Parameters:
            user: a valid User model representing the currently logged in User
            id: int, the id of the resource

        Returns:
            Resource

        Raises:
            ResourceNotFoundException: If no resource is found with id
        """
        resource = (
            self._session.query(ResourceEntity)
            .filter(
                ResourceEntity.id == id,
                ResourceEntity.program.in_(user.program),
            )
            .one_or_none()
        )

        if resource is None:
            raise ResourceNotFoundException(f"No resource found with id: {id}")

        return resource.to_model()

    def update(self, user: User, resource: ResourceEntity) -> Resource:
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
        if user.role != UserTypeEnum.ADMIN:
            raise ProgramNotAssignedException(
                f"User is not {UserTypeEnum.ADMIN}, cannot update service"
            )

        resource_entity = (
            self._session.query(ResourceEntity)
            .filter(ResourceEntity.id == resource.id)
            .one_or_none()
        )

        self._tag_service.delete_all_tags_service(resource)

        if resource_entity is None:
            raise ResourceNotFoundException(
                "The resource you are searching for does not exist."
            )

        resource_entity.name = resource.name
        resource_entity.summary = resource.summary
        resource_entity.program = resource.program
        resource_entity.link = resource.link

        for tag in resource.tags:
            tag_entity = self._tag_service.get_or_create_tag(tag.content)
            self._tag_service.add_tag_resource(
                user, tag_entity, ResourceEntity.to_model(resource_entity)
            )

        self._session.commit()
        return resource_entity.to_model()

    def delete(self, user: User, resource: Resource) -> None:
        """
        Delete resource based on id that the user has access to

        Parameters:
            user: a valid User model representing the currently logged in User
            id: int, a unique resource id

        Raises:
            ResourceNotFoundException: If no resource is found with the corresponding id
        """

        if user.role != UserTypeEnum.ADMIN:
            raise ProgramNotAssignedException(
                f"User is not {UserTypeEnum.ADMIN}, cannot delete service"
            )

        resource = (
            self._session.query(ResourceEntity)
            .filter(
                ResourceEntity.id == resource.id,
                ResourceEntity.program.in_(user.program),
            )
            .one_or_none()
        )

        if resource is None:
            raise ResourceNotFoundException(f"No resource found with matching id: {id}")

        self._session.delete(resource)
        self._session.commit()

    def get_by_slug(self, user: User, search_string: str) -> list[Resource]:
        """
        Get a list of resources given a search string that the user has access to

        Parameters:
            user: a valid User model representing the currently logged in User
            search_string: a string to search resources by

        Returns:
            list[Resource]: list of resources relating to the string

        Raises:
            ResourceNotFoundException if no resource is found with the corresponding slug
        """
        query = select(ResourceEntity).filter(
            and_(
                ResourceEntity.program.in_(user.program),
                or_(
                    ResourceEntity.name.ilike(f"%{search_string}%"),
                    ResourceEntity.summary.ilike(f"%{search_string}%"),
                ),
            )
        )
        entities = self._session.scalars(query).all()

        return [entity.to_model() for entity in entities]

    def get_by_program(self, user: User, program: ProgramTypeEnum):
        if not user.program.__contains__(program):
            raise ProgramNotAssignedException

        query = select(ResourceEntity).where(ResourceEntity.program == program)
        entities = self._session.scalars(query).all()
        return [entity.to_model() for entity in entities]

    def get_by_tag_id(self, tag_id: int) -> List[Resource]:
        resource_ids = self._tag_service.get_all_resources_by_tagid(tag_id)
        resources = []
        for id in resource_ids:
            resources.append(self.get_by_id(id))
        return resources
