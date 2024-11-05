""" Defines the table for storing tags """

# Import our mapped SQL types from SQLAlchemy
from sqlalchemy import Integer, String, DateTime

# Import mapping capabilities from the SQLAlchemy ORM
from sqlalchemy.orm import Mapped, mapped_column, relationship

# Import the EntityBase that we are extending
from .entity_base import EntityBase

# Import datetime for created_at type
from datetime import datetime

from ..models.tag_model import Tag

from typing import Self


class TagEntity(EntityBase):

    # set table name
    __tablename__ = "tag"

    # set fields
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)
    content: Mapped[str] = mapped_column(String(100), nullable=False)

    # relationships
    resource: Mapped[list["ResourceTagEntity"]] = relationship(
        back_populates="tag", cascade="all,delete", overlaps="tag"
    )
    service: Mapped[list["ServiceTagEntity"]] = relationship(
        back_populates="tag", cascade="all,delete", overlaps="tag"
    )

    @classmethod
    def from_model(cls, model: Tag) -> Self:
        """
        Create a user entity from model

        Args: model (User): the model to create the entity from

        Returns:
            self: The entity
        """

        return cls(
            id=model.id,
            content=model.content,
        )

    def to_model(self) -> Tag:
        """
        Create a user model from entity

        Returns:
            User: A User model for API usage
        """

        return Tag(id=self.id, content=self.content, created_at=self.created_at)
