from typing import List
from fastapi import Depends

from backend.models.enum_for_models import UserTypeEnum
from ..database import db_session
from sqlalchemy.orm import Session
from sqlalchemy import select
from ..entities import TagEntity, ResourceTagEntity, ServiceTagEntity
from ..models import User, Resource, Service, Tag, ResourceTag, ServiceTag
from .exceptions import ProgramNotAssignedException, ResourceNotFoundException


class TagService:

    def __init__(self, session: Session = Depends(db_session)):
        self._session = session

    def all(self) -> list[Tag]:
        """Returns a list of all Tags"""

        query = select(TagEntity)
        entities = self._session.scalars(query).all()

        return [entity.to_model() for entity in entities]

    def get_tag_by_id(self, id: int) -> Tag:
        """Returns tag based on it's id."""

        tag = self._session.query(TagEntity).filter(TagEntity.id == id).one_or_none()
        return tag

    def create(self, tag: Tag) -> Tag:
        """Creates a tag in the database with id and content."""

        # Add user permission check here if needed

        tag_entity = TagEntity.from_model(tag)
        self._session.add(tag_entity)
        self._session.commit()

        return tag_entity.to_model()

    def delete(self, id: int) -> None:
        """Method to delete a tag from the database, along with all connections."""

        tag = self._session.query(TagEntity).filter(TagEntity.id == id).one_or_none()

        if tag is None:
            raise ResourceNotFoundException(f"No tag found with matching id: {id}")

        self._session.delete(tag)

        resource_tags = (
            self._session.query(ResourceTagEntity)
            .filter(ResourceTagEntity.tagId == id)
            .all()
        )

        for tag in resource_tags:
            self._session.delete(tag)

        service_tags = (
            self._session.query(ServiceTagEntity)
            .filter(ServiceTagEntity.tagId == id)
            .all()
        )

        for tag in service_tags:
            self._session.delete(tag)

        self._session.commit()

    def get_tags_for_resource(self, resource: Resource) -> list[Tag]:
        """Get tags based on a resource."""
        tags: list[Tag] = []
        resource_tags = (
            self._session.query(ResourceTagEntity)
            .filter(ResourceTagEntity.tagId == resource.id)
            .all()
        )

        if resource_tags is None:
            raise ResourceNotFoundException(
                f"No tags found for resource with id: {resource.id}"
            )

        for tag in resource_tags:
            tags.append(self.get_tag_by_id(tag.id))

        return tags

    def get_tags_for_service(self, service: Service) -> list[Tag]:
        """Get tags based on a resource."""
        tags: list[Tag] = []
        service_tags = (
            self._session.query(ServiceTagEntity)
            .filter(ServiceTagEntity.serviceId == service.id)
            .all()
        )

        if service_tags is None:
            raise ResourceNotFoundException(
                f"No tags found for service with id: {service.id}"
            )

        for tag in service_tags:
            tags.append(self.get_tag_by_id(tag.id))

        return tags

    def add_tag_resource(self, user: User, tag: Tag, resource: Resource) -> None:
        """Adds a tag to a resource"""
        if user.role != UserTypeEnum.ADMIN:
            raise ProgramNotAssignedException(
                f"User is not {UserTypeEnum.ADMIN}, cannot update resource tags"
            )

        existing_tag = (
            self._session.query(ResourceTagEntity)
            .filter(
                ResourceTagEntity.tagId == tag.id,
                ResourceTagEntity.resourceId == resource.id,
            )
            .first()
        )

        if existing_tag:
            raise Exception(
                f"Tag with id {tag.id} already exists for resource with id {resource.id}."
            )

        resource_tag_entity = ResourceTagEntity.from_model(
            ResourceTag(tagId=tag.id, resourceId=resource.id)
        )

        try:
            self._session.add(resource_tag_entity)
            self._session.commit()
        except Exception as e:
            self._session.rollback()  # Rollback in case of error
            raise Exception("Failed to add tag to resource") from e

    def delete_tag_resource(self, user: User, tag: Tag, resource: Resource) -> None:
        """Deletes a tag from a service"""

        existing_tag = (
            self._session.query(ResourceTagEntity)
            .filter(
                ResourceTagEntity.tagId == tag.id,
                ResourceTagEntity.resourceId == resource.id,
            )
            .first()
        )

        if existing_tag == None:
            raise Exception(
                f"Tag with id {tag.id} does not exist for resource with id {resource.id}."
            )

        try:
            self._session.delete(existing_tag)
            self._session.commit()
        except Exception as e:
            self._session.rollback()  # Rollback in case of error
            raise Exception("Failed to delete tag to service") from e

    def add_tag_service(self, user: User, tag: Tag, service: Service) -> None:
        """Adds a tag to a service"""

        existing_tag = (
            self._session.query(ServiceTagEntity)
            .filter(
                ServiceTagEntity.tagId == tag.id,
                ServiceTagEntity.serviceId == service.id,
            )
            .first()
        )

        if existing_tag:
            raise Exception(
                f"Tag with id {tag.id} already exists for service with id {service.id}."
            )

        service_tag_entity = ServiceTagEntity.from_model(
            ServiceTag(tagId=tag.id, serviceId=service.id)
        )

        try:
            self._session.add(service_tag_entity)
            self._session.commit()
        except Exception as e:
            self._session.rollback()  # Rollback in case of error
            raise Exception("Failed to add tag to service") from e

    def delete_tag_service(self, user: User, tag: Tag, service: Service) -> None:
        """Deletes a tag from a service"""

        existing_tag = (
            self._session.query(ServiceTagEntity)
            .filter(
                ServiceTagEntity.tagId == tag.id,
                ServiceTagEntity.serviceId == service.id,
            )
            .first()
        )

        if existing_tag == None:
            raise Exception(
                f"Tag with id {tag.id} does not exist for service with id {service.id}."
            )

        try:
            self._session.delete(existing_tag)
            self._session.commit()
        except Exception as e:
            self._session.rollback()  # Rollback in case of error
            raise Exception("Failed to delete tag to service") from e

    def delete_all_tags_service(self, service: Service) -> None:
        """Deletes all service tags for a service"""

        service_tags = (
            self._session.query(ServiceTagEntity)
            .filter(ServiceTagEntity.serviceId == service.id)
            .all()
        )

        if service_tags.count(ServiceTagEntity) == 0:
            return

        service_tags.delete(synchronize_session=False)
        self._session.commit()

    def delete_all_tags_resource(self, resource: Resource) -> None:
        """Deletes all resource tags for a resource"""

        resource_tags = (
            self._session.query(ResourceTagEntity)
            .filter(ResourceTagEntity.resourceId == resource.id)
            .all()
        )

        if resource_tags.count() == 0:
            return

        resource_tags.delete(synchronize_session=False)
        self._session.commit()

    def get_or_create_tag(self, content: str) -> Tag:
        existing_tag = (
            self._session.query(TagEntity)
            .filter(TagEntity.content == content)
            .one_or_none()
        )

        if existing_tag:
            return existing_tag.to_model()

        try:
            tag = Tag(content=content)
            tag_entity = TagEntity.from_model(tag)
            self._session.add(tag_entity)
            self._session.commit()
            return tag_entity.to_model()
        except Exception as e:
            self._session.rollback()
            raise Exception(f"Failed to create tag with content: {tag.content}") from e

    def get_all_services_by_tagid(self, tagId: int) -> List[int]:
        services = (
            self._session.query(ServiceTagEntity)
            .filter(ServiceTagEntity.tagId == tagId)
            .all()
        )

        return [service.serviceId for service in services]

    def get_all_resources_by_tagid(self, tagId: int) -> List[int]:
        resources = (
            self._session.query(ResourceTagEntity)
            .filter(ResourceTagEntity.tagId == tagId)
            .all()
        )

        return [resource.resourceId for resource in resources]
