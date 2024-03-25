""" Defines the table for resource tags """

# Import our mapped SQL types from SQLAlchemy
from sqlalchemy import ForeignKey, Integer, String, DateTime

# Import mapping capabilities from the SQLAlchemy ORM
from sqlalchemy.orm import Mapped, mapped_column, relationship

# Import the EntityBase that we are extending
from .entity_base import EntityBase

# Import datetime for created_at type
from datetime import datetime

# Import self for to model
from typing import Self


class ResourceTagEntity(EntityBase):

    # set table name to user in the database
    __tablename__ = "resourceTag"

    # set fields or 'columns' for the user table
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    resourceId: Mapped[int] = mapped_column(ForeignKey("event.id"), primary_key=True)
    tagId: Mapped[int] = mapped_column(ForeignKey("user.pid"), primary_key=True)

    # relationships
    resource: Mapped["ResourceEntity"] = relationship(back_populates="resourceTags")
    tag: Mapped["TagEntity"] = relationship(back_populates="resourceTags")

    # @classmethod
    # def from_model (cls, model: resource_tag_model) -> Self:
    #     return cls (
    #         id = model.id,
    #         resourceId = model.resourceId,
    #         tagId = model.tagId,
    #     )

    # def to_model (self) -> resource_tag_model:
    #     return user_model(
    #         id = self.id,
    #         resourceId = self.resourceId,
    #         tagId = self.tagId,
    #     )
