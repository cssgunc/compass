from compass.backend.organization_entity import create_engine, Column, Integer, String

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

# Import self
from typing import Self


class RoleEnum(enum.Enum):
    """ Determine role for User """
    ADMIN = 'ADMIN'
    EMPLOYEE = 'EMPLOYEE'
    VOLUNTEER = 'VOLUNTEER'
    """Determine role for User"""

    ADMIN = "ADMIN"
    EMPLOYEE = "EMPLOYEE"
    VOLUNTEER = "VOLUNTEER"

class UserEntity:
    def __init__(self, id: Optional[int] = None, username: Optional[str] = None, role: Optional[RoleEnum] = None, email: Optional[str] = None, program: Optional[List[ProgramEnum]] = None, experience: Optional[int] = None, group: Optional[str] = None):
        self.id = id
        self.username = username
        self.role = role
        self.email = email
        self.program = program
        self.experience = experience
        self.group = group

    @classmethod
    def from_model(cls, model: User) -> 'UserEntity':
        """
        Create a user entity from model
        Args:
            model (User): the model to create the entity from
        Returns:
            UserEntity: The entity
        """
        return cls(
            id=model.id,
            username=model.username,
            role=RoleEnum(model.role),  # Assuming model.role is already an instance of RoleEnum
            email=model.email,
            program=model.program,
            experience=model.experience,
            group=model.group,
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
            role=self.role.value,  # Assuming User model expects the role attribute to be a string
            email=self.email,
            program=self.program,
            experience=self.experience,
            group=self.group,
        )


