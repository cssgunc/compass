""" Defines the table for storing users """

# Import our mapped SQL types from SQLAlchemy
from sqlalchemy import Integer, String, DateTime, ARRAY, Enum

# Import mapping capabilities from the SQLAlchemy ORM
from sqlalchemy.orm import Mapped, mapped_column

# Import the EntityBase that we are extending
from .entity_base import EntityBase

# Import datetime for created_at type
from datetime import datetime

# Import enums for Role and Program
from .program_enum import Program_Enum
from .user_enum import Role_Enum

# Import models for User methods
from ..models.user_model import User

from typing import Self


class UserEntity(EntityBase):
    """Serves as the database model for User table"""

    # set table name to user in the database
    __tablename__ = "user"

    # set fields or 'columns' for the user table
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)
    username: Mapped[str] = mapped_column(
        String(32), nullable=False, default="", unique=True
    )
    role: Mapped[Role_Enum] = mapped_column(Enum(Role_Enum), nullable=False)
    email: Mapped[str] = mapped_column(String(50), nullable=False, unique=True)
    program: Mapped[list[Program_Enum]] = mapped_column(
        ARRAY(Enum(Program_Enum)), nullable=False
    )
    experience: Mapped[int] = mapped_column(Integer, nullable=False)
    group: Mapped[str] = mapped_column(String(50))
    uuid: Mapped[str] = mapped_column(String, nullable=True)

    @classmethod
    def from_model(cls, model: User) -> Self:
        """
        Create a user entity from model

        Args: model (User): the model to create the entity from

        Returns:
            self: The entity
        """

        return cls(
            id=model.id,
            created_at=model.created_at,
            username=model.username,
            role=model.role,
            email=model.email,
            program=model.program,
            experience=model.experience,
            group=model.group,
            uuid=model.uuid,
        )

    def to_model(self) -> User:
        """

        Create a user model from entity

        Returns:
            User: A User model for API usage

        """

        return User(
            id=self.id,
            username=self.username,
            email=self.email,
            experience=self.experience,
            group=self.group,
            program=self.program,
            role=self.role,
            created_at=self.created_at,
            uuid=self.uuid,
        )
