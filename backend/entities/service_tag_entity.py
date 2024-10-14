""" Defines the table for service tags """

# Import our mapped SQL types from SQLAlchemy
from sqlalchemy import ForeignKey, Integer

# Import mapping capabilities from the SQLAlchemy ORM
from sqlalchemy.orm import Mapped, mapped_column, relationship

# Import the EntityBase that we are extending
from .entity_base import EntityBase


class ServiceTagEntity(EntityBase):

    # set table name to user in the database
    __tablename__ = "service_tag"

    # set fields or 'columns' for the user table
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    resource_id: Mapped[int] = mapped_column(ForeignKey("service.id"), primary_key=True)
    tag_id: Mapped[int] = mapped_column(ForeignKey("tag.id", primary_key=True))
    service: Mapped["ServiceEntity"] = mapped_column(backpopulates="tags")
    tag: Mapped["TagEntity"] = mapped_column(backpopulates="service_tags")
