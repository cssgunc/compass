""" Defines the table for resource tags """

# Import our mapped SQL types from SQLAlchemy
from sqlalchemy import ForeignKey, Integer, String, DateTime, ARRAY

# Import mapping capabilities from the SQLAlchemy ORM
from sqlalchemy.orm import Mapped, mapped_column, relationship

# Import the EntityBase that we are extending
from .entity_base import EntityBase

# Import datetime for created_at type
from datetime import datetime

# Import enums for Role and Program
import enum
from sqlalchemy import Enum


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
