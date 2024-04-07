from fastapi import Depends
from ..database import db_session
from sqlalchemy.orm import Session
from sqlalchemy import select, or_
from ..models.resource_model import Resource
from ..entities.resource_entity import ResourceEntity
from ..models.user_model import User

from .exceptions import ResourceNotFoundException


"""
    Field reference:

    id: int | None = None
    name: str = Field(..., max_length=150, description="The name of the resource")
    summary: str = Field(..., max_length=300, description="The summary of the resource")
    link: str = Field(..., max_length=150, description="link to the resource")
    programtype: ProgramTypeEnum
    created_at: Optional[datetime]
"""


class ResourceService:

    def __init__(self, session: Session = Depends(db_session)):
        self._session = session

    def all(self) -> list[Resource]:
        """
        Retrieves all Resources from the table

        Returns:
            list[Resource]: list of all `Resource`
        """
        # Select all entries in the `Resource` table
        query = select(ResourceEntity)
        entities = self._session.scalars(query).all()

        # Convert entries to a model and return
        return [entity.to_model() for entity in entities]

    def create(self, subject: User, resource: Resource) -> Resource:
        """
        Creates a resource based on the input object and adds it to the table.

        Returns:
            Resource: Object added to table
        """

        # Check if user has admin permissions
        # TODO

        # Create new resource object
        recource_entity = ResourceEntity.from_model(resource)

        self._session.add(recource_entity)
        self._session.commit()

        # Return added object
        return recource_entity.to_model()

    def get_by_id(self, id: int) -> Resource:
        """
        Gets a resource based on the resource id

        Returns:
            Resource
        """

        # Query the resource table with id
        resource = (
            self._session.query(ResourceEntity)
            .filter(ResourceEntity.id == id)
            .one_or_none()
        )

        # Check if result is null
        if resource is None:
            raise ResourceNotFoundException(f"No resource found with id: {id}")

        return resource.to_model()

    def update(self, subject: User, resource: ResourceEntity) -> Resource:
        """
        Update the resource
        If none found with that id, a debug description is displayed.

        Parameters:
            subject: a valid User model representing the currently logged in User
            resource (Resource): Resource to add to table

        Returns:
            Resource: Updated resource object

        Raises:
            ResourceNotFoundException: If no resource is found with the corresponding ID
        """

        # Check if user has admin permissions
        # TODO

        # Query the resource table with matching id
        obj = self._session.get(ResourceEntity, resource.id) if resource.id else None

        # Check if result is null
        if obj is None:
            raise ResourceNotFoundException(
                f"No resource found with matching id: {resource.id}"
            )

        # Update resource object
        obj.name = resource.name
        obj.summary = resource.summary
        obj.link = resource.link
        obj.programtype = resource.programtype

        # Save Changes
        self._session.commit()

        # Return updated object
        return obj.to_model()

    def delete(self, subject: User, id: int) -> None:
        """
        Delete resource based on id
        If no resource exists, a debug description is displayed.

        Parameters:
            subject: a valid User model representing the currently logged in User
            id: a string representing a unique resource id

        Raises:
            ResourceNotFoundException: If no resource is found with the corresponding id
        """

        # Check if user has admin permissions
        # TODO

        # Query the resource table with matching id
        resource = (
            self._session.query(ResourceEntity)
            .filter(ResourceEntity.id == id)
            .one_or_none()
        )

        # Check if result is null
        if resource is None:
            raise ResourceNotFoundException(f"No resource found with matching id: {id}")

        # Delete object and commit
        self._session.delete(resource)

        # Save Changes
        self._session.commit()

    def get_by_slug(self, search_string: str) -> list[Resource]:
        """
        Get a list of resources given a search string
        If none retrieved, a debug description is displayed.

        Parameters:
            search_string: a string to search resources by

        Returns:
            list[Resource]: list of resources relating to the string

        Raises:
            ResourceNotFoundException if no resource is found with the corresponding slug
        """

        # Query the resource with matching slug
        query = select(ResourceEntity).where(
            or_(
                ResourceEntity.title.ilike(f"%{search_string}%"),
                ResourceEntity.details.ilike(f"%{search_string}%"),
                ResourceEntity.location.ilike(f"%{search_string}%"),
            )
        )
        entities = self._session.scalars(query).all()

        # Convert entries to a model and return
        return [entity.to_model() for entity in entities]
