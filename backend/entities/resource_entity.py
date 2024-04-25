""" Defines the table for storing resources """

# Import our mapped SQL types from SQLAlchemy
from sqlalchemy import Integer, String, DateTime, Enum

# Import mapping capabilities from the SQLAlchemy ORM
from sqlalchemy.orm import Mapped, mapped_column, relationship

# Import the EntityBase that we are extending
from .entity_base import EntityBase

# Import datetime for created_at type
from datetime import datetime

# Import self for to model
from typing import Self
from backend.entities.program_enum import Program_Enum
from ..models.resource_model import Resource


class ResourceEntity(EntityBase):

    # set table name
    __tablename__ = "resource"

    # set fields
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)
    name: Mapped[str] = mapped_column(String(32), nullable=False)
    summary: Mapped[str] = mapped_column(String(100), nullable=False)
    link: Mapped[str] = mapped_column(String, nullable=False)
    program: Mapped[Program_Enum] = mapped_column(Enum(Program_Enum), nullable=False)
    # relationships
    resourceTags: Mapped[list["ResourceTagEntity"]] = relationship(
        back_populates="resource", cascade="all,delete"
    )

    @classmethod
    def from_model(cls, model: Resource) -> Self:
        """
        Create a UserEntity from a User model.

        Args:
            model (User): The model to create the entity from.

        Returns:
            Self: The entity (not yet persisted).
        """

        return cls(
            id=model.id,
            created_at=model.created_at,
            name=model.name,
            summary=model.summary,
            link=model.link,
            program=model.program,
        )

    def to_model(self) -> Resource:
        return Resource(
            id=self.id,
            created_at=self.created_at,
            name=self.name,
            summary=self.summary,
            link=self.link,
            program=self.program,
        )
