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
    __tablename__ = "resource_tag"

    # set fields or 'columns' for the user table
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    resource_id: Mapped[int] = mapped_column(ForeignKey("resource.id"), primary_key=True)
    tag_id: Mapped[int] = mapped_column(ForeignKey("tag.id", primary_key=True))
    resource: Mapped["ResourceEntity"] = mapped_column(backpopulates="tags")
    tag: Mapped["TagEntity"] = mapped_column(backpopulates="resource_tags")

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
