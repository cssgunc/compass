""" Defines the table for service tags """

# Import our mapped SQL types from SQLAlchemy
from sqlalchemy import ForeignKey, Integer

# Import mapping capabilities from the SQLAlchemy ORM
from sqlalchemy.orm import Mapped, mapped_column, relationship

# Import the EntityBase that we are extending
from .entity_base import EntityBase

from typing import Self

from ..models.service_tag_model import ServiceTag


class ServiceTagEntity(EntityBase):

    # set table name to user in the database
    __tablename__ = "service_tag"

    # set fields or 'columns' for the user table
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    serviceId: Mapped[int] = mapped_column(ForeignKey("service.id"))
    tagId: Mapped[int] = mapped_column(ForeignKey("tag.id"))

    # relationships
    service: Mapped["ServiceEntity"] = relationship(back_populates="service_tags")
    tag: Mapped["TagEntity"] = relationship(back_populates="service")

    def to_model(self) -> ServiceTag:
        return ServiceTag(id=self.id, serviceId=self.serviceId, tagId=self.tagId)

    @classmethod
    def from_model(cls, model: "ServiceTag") -> Self:
        return cls(
            id=model.id,
            serviceId=model.serviceId,
            tagId=model.tagId,
        )
