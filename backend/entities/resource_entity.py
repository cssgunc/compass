""" Defines the table for storing resources """
# Import our mapped SQL types from SQLAlchemy
from sqlalchemy import Integer, String, DateTime
# Import mapping capabilities from the SQLAlchemy ORM
from sqlalchemy.orm import Mapped, mapped_column, relationship
# Import the EntityBase that we are extending
from .entity_base import EntityBase
# Import datetime for created_at type
from datetime import datetime
# Import enums for Program
import enum
from sqlalchemy import Enum

class ProgramEnum(enum.Enum):
    """ Determine program for Resource """
    DOMESTIC = 'DOMESTIC'
    ECONOMIC = 'ECONOMIC'
    COMMUNITY = 'COMMUNITY'

class ResourceEntity(EntityBase): 

    #set table name 
    __tablename__ = "resource"

    #set fields
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)
    name: Mapped[str] = mapped_column(String(32), nullable=False)
    summary: Mapped[str] = mapped_column(String(100), nullable=False)
    link: Mapped[str] = mapped_column(String, nullable=False)
    program: Mapped[ProgramEnum] = mapped_column(Enum(ProgramEnum), nullable=False)

    #relationships
    resourceTags: Mapped[list["ResourceTagEntity"]] = relationship(back_populates="resource", cascade="all,delete")




