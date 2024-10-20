from fastapi import Depends
from ..database import db_session
from sqlalchemy.orm import Session
from sqlalchemy import select
from ..entities import TagEntity, ResourceTagEntity, ServiceTagEntity
from ..models import User, Resource, Service, Tag, ResourceTag
from .exceptions import ResourceNotFoundException


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
        return tag.to_model()

    def create(self, user: User, tag: Tag) -> Tag:
        """Creates a tag in the database with id and content."""

        # Add user permission check here if needed

        tag_entity = TagEntity.from_model(tag)
        self._session.add(tag_entity)
        self._session.commit()

        return tag_entity.to_model()

    def delete(self, user: User, id: int) -> None:
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

    def get_tags_for_resource(self, user: User, resource: Resource) -> list[Tag]:
        """Get tags based on a resource."""
        tags: list[Tag]
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

    def get_tags_for_service(self, user: User, service: Service) -> list[Tag]:
        """Get tags based on a resource."""
        tags: list[Tag]
        service_tags = (
            self._session.query(ServiceTagEntity)
            .filter(ServiceTagEntity.tagId == service.id)
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
        resource_tag_entity = ResourceTagEntity.from_model(
            ResourceTag(tag_id=tag.id, resource_id=resource.id)
        )
        self._session.add(resource_tag_entity)
        self._session.commit()
