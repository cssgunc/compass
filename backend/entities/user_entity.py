""" Defines the table for storing users """

# Import our mapped SQL types from SQLAlchemy
from sqlalchemy import Integer, String, DateTime, ARRAY

# Import mapping capabilities from the SQLAlchemy ORM
from sqlalchemy.orm import Mapped, mapped_column

# Import the EntityBase that we are extending
from .entity_base import EntityBase

# Import datetime for created_at type
from datetime import datetime

# Import enums for Role and Program
import enum
from sqlalchemy import Enum
from program_type_enum import ProgramType
from user_enum import RoleType


class UserEntity(EntityBase):
    """Serves as the databse model for User table"""

    # set table name to user in the database
    __tablename__ = "user"

    # set fields or 'columns' for the user table
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)
    username: Mapped[str] = mapped_column(
        String(32), nullable=False, default="", unique=True
    )
    role: Mapped[RoleType] = mapped_column(Enum(RoleType), nullable=False)
    email: Mapped[str] = mapped_column(String(50), nullable=False, unique=True)
    program: Mapped[list[ProgramType]] = mapped_column(
        ARRAY(Enum(ProgramType)), nullable=False
    )
    experience: Mapped[int] = mapped_column(Integer, nullable=False)
    group: Mapped[str] = mapped_column(String(50))
