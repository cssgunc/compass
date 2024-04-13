"""Service Methods for Users and Tages."""

from fastapi import HTTPException, Depends
from sqlalchemy.orm import Session
from ..database import db_session
from ..models.tag_model import Tag
from ..entities.tag_entity import TagEntity
from sqlalchemy import select

# Write methods for DELETE a tag, PUT a tag, and GET a single tag
# Writing out service methods for the User entity and Tag Entity, and writing associated tests for each method
# When writing out the service keep in mind cases when you try to do something but it is either illegal or results in no valid result
# Remember the service output will always be a Pydantic model as we connecting the API to the DB using this layer as an abstractions



class TagService:

    def __init__(self, session: Session = Depends(db_session)):
        """Initialize TagService with a SQLAlchemy session."""
        self._session = session

    def get_tag_by_id(self, tag_id: int) -> Tag: 
        """
        Get a tag by ID from the database.

        Args:
            tag_id (int): The ID of the tag to retrieve.

        Returns:
            Tag: A Pydantic model representing the retrieved tag.
        
        Raises:
            HTTPException: If no tag found with the matching ID.
        """
        query = select(TagEntity).where(TagEntity.id == tag_id)
        tag_entity: TagEntity | None = self._session.scalar(query)

        if tag_entity is None:
            raise HTTPException(
                status_code=404,
                detail=f"No tag found with matching id: {tag_id}"
            )

        return tag_entity.to_model()

    def delete_tag(self, tag_id: int) -> bool:
        """
        Delete a tag by its ID from the database.

        Args:
            tag_id (int): The ID of the tag to delete.

        Returns:
            bool: True if deletion successful, False otherwise.
        """
        query = select(TagEntity).where(TagEntity.id == tag_id)
        tag_entity: TagEntity | None = self._session.scalar(query)

        if tag_entity is None:
            return False  # Tag not found, return False

        self._session.delete(tag_entity)
        self._session.commit()
        return True

    def update_tag(self, tag_id: int, content: str) -> Tag:
        """
        Update the content of a tag.

        Args:
            tag_id (int): The ID of the tag to update.
            content (str): The new content for the tag.

        Returns:
            Tag: A Pydantic model representing the updated tag.
        
        Raises:
            HTTPException: If no tag found with the matching ID.
        """
        query = select(TagEntity).where(TagEntity.id == tag_id)
        tag_entity: TagEntity | None = self._session.scalar(query)

        if tag_entity is None:
            raise HTTPException(
                status_code=404,
                detail=f"No tag found with matching id: {tag_id}"
            )

        tag_entity.content = content
        self._session.commit()
        return tag_entity.to_model()
