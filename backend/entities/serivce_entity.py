""" Defines the table for storing services """

# Import our mapped SQL types from SQLAlchemy
from sqlalchemy import Integer, String, DateTime, ARRAY

# Import mapping capabilities from the SQLAlchemy ORM
from sqlalchemy.orm import Mapped, mapped_column, relationship

# Import the EntityBase that we are extending
from .entity_base import EntityBase

# Import datetime for created_at type
from datetime import datetime

# Import enums for Program
import enum
from sqlalchemy import Enum

# Import ProgramType enumeration
from backend.entities.program_type_enum import ProgramType


class ResourceEntity(EntityBase):

    # set table name
    __tablename__ = "service"

    # set fields
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)
    name: Mapped[str] = mapped_column(String(32), nullable=False)
    summary: Mapped[str] = mapped_column(String(100), nullable=False)
    requirements: Mapped[list[str]] = mapped_column(ARRAY(String))
    program: Mapped[ProgramType] = mapped_column(Enum(ProgramType), nullable=False)

    # relationships
    resourceTags: Mapped[list["ServiceTagEntity"]] = relationship(
        back_populates="service", cascade="all,delete"
    )
