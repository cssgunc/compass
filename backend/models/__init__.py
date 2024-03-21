from sqlalchemy import (
    create_engine,
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey,
    Enum,
    ARRAY,
)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime

Base = declarative_base()


class UserRole(enum.Enum):
    ADMIN = "ADMIN"
    EDITOR = "EMPLOYEE"
    GUEST = "VOLUNTEER"


class ProgramType(enum.Enum):
    FULL_TIME = "DOMESTIC"
    PART_TIME = "ECONOMIC"
    CONTRACT = "VOLUNTEER"


class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True, autoincrement=True)
    created_at = Column(DateTime)
    username = Column(
        String(50), unique=True, default=datetime.astimezone, nullable=False
    )
    role = Column(Enum(UserRole), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    program = Column(Enum(ProgramType), nullable=False)
    years_of_experience = Column(Integer, nullable=False)
    group = Column(String, nullable=False)


class Resource(Base):
    __tablename__ = "resource"
    id = Column(Integer, primary_key=True, autoincrement=True)
    created_at = Column(DateTime)
    name = Column(String(50), nullable=False)
    summary = Column(String(100), nullable=False)
    link = Column(String, nullable=False)
    program = Column(Enum(ProgramType), nullable=False)

    tags = relationship("Tag", secondary="resource_tag")


class Service(Base):
    __tablename__ = "service"
    id = Column(Integer, primary_key=True, autoincrement=True)
    created_at = Column(DateTime)
    name = Column(String(50), nullable=False)
    status = Column(String, nullable=False)
    summary = Column(String(100), nullable=False)
    requirements = Column(ARRAY(String), nullable=False)

    tags = relationship("Tag", secondary="service_tag")


class Tag(Base):
    __tablename__ = "tag"
    id = Column(Integer, primary_key=True)
    content = Column(String, nullable=False)

    services = relationship("Service", secondary="service_tag")
    resources = relationship("Resource", secondary="resource_tag")


class ResourceTag(Base):
    __tablename__ = "resource_tag"
    id = Column(Integer, primary_key=True)
    resource_id = Column(Integer, ForeignKey("resource.id"))
    tag_id = Column(Integer, ForeignKey("tag.id"))


class ServiceTag(Base):
    __tablename__ = "service_tag"
    id = Column(Integer, primary_key=True)
    service_id = Column(Integer, ForeignKey("service.id"))
    tag_id = Column(Integer, ForeignKey("tag.id"))
