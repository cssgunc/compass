""" Defines the table for service tags """

# Import our mapped SQL types from SQLAlchemy
from sqlalchemy import ForeignKey, Integer

# Import mapping capabilities from the SQLAlchemy ORM
from sqlalchemy.orm import Mapped, mapped_column, relationship

# Import the EntityBase that we are extending
from .entity_base import EntityBase


class ServiceTagEntity(EntityBase):

    # set table name to user in the database
    __tablename__ = "serviceTag"

    # set fields or 'columns' for the user table
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    sericeId: Mapped[int] = mapped_column(ForeignKey("event.id"), primary_key=True)
    tagId: Mapped[int] = mapped_column(ForeignKey("user.pid"), primary_key=True)

    # relationships
    service: Mapped["ServiceEntity"] = relationship(back_populates="resourceTags")
    tag: Mapped["TagEntity"] = relationship(back_populates="resourceTags")
