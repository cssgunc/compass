""" Defines the table for resource tags """

# Import our mapped SQL types from SQLAlchemy
from importlib.resources import Resource
from sqlalchemy import ForeignKey, Integer, String, DateTime

# Import mapping capabilities from the SQLAlchemy ORM
from sqlalchemy.orm import Mapped, mapped_column, relationship

# Import the EntityBase that we are extending
from .entity_base import EntityBase

# Import datetime for created_at type
from datetime import datetime

# Import self for to model
from typing import Self

from ..models import ResourceTag


class ResourceTagEntity(EntityBase):

    # set table name to user in the database
    __tablename__ = "resource_tag"

    # set fields or 'columns' for the user table
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    resourceId: Mapped[int] = mapped_column(ForeignKey("resource.id"))
    tagId: Mapped[int] = mapped_column(ForeignKey("tag.id"))

    # relationships
    resource: Mapped["ResourceEntity"] = relationship(back_populates="resource_tags")
    tag: Mapped["TagEntity"] = relationship(back_populates="resource")

    def to_model(self) -> ResourceTag:
        return ResourceTag(
            id=self.id,
            resourceId=self.resourceId,
            tagId=self.tagId,
        )

    @classmethod
    def from_model(cls, model: "ResourceTag") -> Self:
        return cls(
            id=model.id,
            resourceId=model.resourceId,
            tagId=model.tagId,
        )
