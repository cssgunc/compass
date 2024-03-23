"""SQLAlchemy model for each of the database table"""

from compass.backend.organization_entity import Column, Integer, String, Text, TIMESTAMP, Enum, ARRAY, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Table

Base = declarative_base()

class UserType(Enum):
    """Enumeration for user roles."""
    ADMIN = 'ADMIN'
    EMPLOYEE = 'EMPLOYEE'
    VOLUNTEER = 'VOLUNTEER'

class ProgramType(Enum):
    """Enumeration for program types."""
    DOMESTIC = 'DOMESTIC'
    ECONOMIC = 'ECONOMIC'
    COMMUNITY = 'COMMUNITY'

class ResourceType(Enum):
    """Enumeration for resource types."""
    DV = 'DV'
    ES = 'ES'
    CE = 'CE'

user_resource_association = Table('user_resource_association', Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id')),
    Column('resource_id', Integer, ForeignKey('resources.id'))
)

class User(Base):
    """
    SQLAlchemy model for the 'users' table.

    Attributes:
        id (int): Unique identifier for the user.
        created_at (datetime): Timestamp when the user was created.
        username (str): User's username.
        role_type (UserType): User's role type (ADMIN, EMPLOYEE, VOLUNTEER).
        email (str): User's email address.
        program (list): Programs associated with the user.
        experience (int): User's experience level.
        services (list): Services provided by the user.
    """
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String, nullable=False)
    role_type = Column(Enum(UserType), nullable=False)
    email = Column(String, nullable=False)
    experience = Column(Integer, nullable=False)
    
    # Relationship with Service table
    services = relationship('Service', back_populates='provider')
    # Many-to-Many relationship with Resource table
    accessed_resources = relationship('Resource', secondary=user_resource_association, back_populates='accessing_users')


class Resource(Base):
    """
    SQLAlchemy model for the 'resources' table.

    Attributes:
        id (int): Unique identifier for the resource.
        name (str): Name of the resource.
        summary (str): Summary of the resource.
        link (str): Link to access the resource.
        program (ResourceType): Program type associated with the resource.
    """
    __tablename__ = 'resources'

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    summary = Column(String(500), nullable=False)
    link = Column(String(100), nullable=False)
    program = Column(Enum(ResourceType), nullable=False)
    
    # Relationship with User table
    accessing_users = relationship('User', secondary=user_resource_association, back_populates='accessed_resources')

class Service(Base):
    """
    SQLAlchemy model for the 'service' table.

    Attributes:
        id (int): Unique identifier for the service.
        created_at (datetime): Timestamp when the service was created.
        name (str): Name of the service.
        status (str): Status of the service (e.g., Active, Inactive).
        summary (str): Summary of the service.
        requirements (list): Requirements for the service.
        program (ProgramType): Program type associated with the service.
        provider_id (int): Foreign key referencing the user who provides the service.
        provider (User): Relationship to the user who provides the service.
    """
    __tablename__ = 'service'

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    status = Column(String(255), nullable=False)
    summary = Column(Text)
    requirements = Column(ARRAY(String))
    program = Column(Enum(ProgramType))
    provider_id = Column(Integer, ForeignKey('users.id'))  # Foreign key referencing the user who provides the service
    
    # Relationship with User table
    provider = relationship('User', back_populates='services')
