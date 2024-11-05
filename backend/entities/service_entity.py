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

from backend.models.service_model import Service
from typing import Self
from backend.models.enum_for_models import ProgramTypeEnum


class ServiceEntity(EntityBase):

    # set table name
    __tablename__ = "service"

    # set fields
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)
    name: Mapped[str] = mapped_column(String(32), nullable=False)
    status: Mapped[str] = mapped_column(String(32), nullable=False)
    summary: Mapped[str] = mapped_column(String(100), nullable=False)
    requirements: Mapped[list[str]] = mapped_column(ARRAY(String))
    program: Mapped[ProgramTypeEnum] = mapped_column(
        Enum(ProgramTypeEnum), nullable=False
    )

    # relationships
    service_tags: Mapped[list["ServiceTagEntity"]] = relationship(
        back_populates="service", cascade="all,delete-orphan"
    )

    def to_model(self) -> Service:
        return Service(
            id=self.id,
            name=self.name,
            status=self.status,
            summary=self.summary,
            requirements=self.requirements,
            program=self.program,
            tags=[tag.tag.to_model() for tag in self.service_tags],
        )

    @classmethod
    def from_model(cls, model: Service) -> Self:
        return cls(
            id=model.id,
            name=model.name,
            status=model.status,
            summary=model.summary,
            requirements=model.requirements,
            program=model.program,
        )
