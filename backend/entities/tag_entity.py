""" Defines the table for storing tags """

# Import our mapped SQL types from SQLAlchemy
from sqlalchemy import Integer, String, DateTime

# Import mapping capabilities from the SQLAlchemy ORM
from sqlalchemy.orm import Mapped, mapped_column, relationship

# Import the EntityBase that we are extending
from .entity_base import EntityBase

# Import datetime for created_at type
from datetime import datetime

class TagEntity(EntityBase):

    #set table name
    __tablename__ = "tag"

    #set fields
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)
    content: Mapped[str] = mapped_column(String(100), nullable=False)

    #relationships
    resourceTags: Mapped[list["ResourceTagEntity"]] = relationship(back_populates="tag", cascade="all,delete")
    serviceTags: Mapped[list["ServiceTagEntity"]] = relationship(back_populates="tag", cascade="all,delete")

