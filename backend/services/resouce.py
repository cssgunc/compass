from fastapi import Depends
from ..database import db_session
from sqlalchemy.orm import Session
from sqlalchemy import select, or_
from ..models.resource_model import Resource
from ..entities.resource_entity import ResourceEntity
from ..models.user_model import User

from .exceptions import ResourceNotFoundException

class ResourceService:

    def __init__(self, session: Session = Depends(db_session)):
        self._session = session

    def all(self, user: User) -> list[Resource]:
        """
        Retrieves all Resources from the table that the user has access to

        Parameters:
            user: a valid User model representing the currently logged in User

        Returns:
            list[Resource]: list of accessible `Resource` for the user
        """
        # Assuming user has 'categories' attribute listing accessible resource categories
        accessible_categories = user.categories
        query = select(ResourceEntity).where(ResourceEntity.category.in_(accessible_categories))
        entities = self._session.scalars(query).all()

        return [entity.to_model() for entity in entities]

    def create(self, user: User, resource: Resource) -> Resource:
        """
        Creates a resource based on the input object and adds it to the table if the user has the right to do so.

        Parameters:
            user: a valid User model representing the currently logged in User
            resource: Resource object to add to table

        Returns:
            Resource: Object added to table
        """

        # Assuming we check user's right to create resources in specific categories
        if resource.category not in user.categories:
            raise PermissionError("User does not have permission to add resources to this category")

        resource_entity = ResourceEntity.from_model(resource)
        self._session.add(resource_entity)
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
        accessible_categories = user.categories
        resource = (
            self._session.query(ResourceEntity)
            .filter(ResourceEntity.id == id, ResourceEntity.category.in_(accessible_categories))
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
        # Check if user has permission to update the resource
        if resource.category not in user.categories:
            raise PermissionError("User does not have permission to update this category")

        obj = self._session.get(ResourceEntity, resource.id) if resource.id else None

        if obj is None:
            raise ResourceNotFoundException(f"No resource found with matching id: {resource.id}")

        obj.update_from_model(resource)  # Assuming an update method exists
        self._session.commit()

        return obj.to_model()

    def delete(self, user: User, id: int) -> None:
        """
        Delete resource based on id that the user has access to

        Parameters:
            user: a valid User model representing the currently logged in User
            id: int, a unique resource id

        Raises:
            ResourceNotFoundException: If no resource is found with the corresponding id
        """
        accessible_categories = user.categories
        resource = (
            self._session.query(ResourceEntity)
            .filter(ResourceEntity.id == id, ResourceEntity.category.in_(accessible_categories))
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
        accessible_categories = user.categories
        query = select(ResourceEntity).where(
            or_(
                ResourceEntity.title.ilike(f"%{search_string}%"),
                ResourceEntity.details.ilike(f"%{search_string}%"),
                ResourceEntity.location.ilike(f"%{search_string}%")
            ),
            ResourceEntity.category.in_(accessible_categories)
        )
        entities = self._session.scalars(query).all()

        return [entity.to_model() for entity in entities]
