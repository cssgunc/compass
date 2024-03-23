from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .entity_base import EntityBase


class SampleEntity(EntityBase):
    __tablename__ = "persons"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    age: Mapped[int] = mapped_column(Integer)
    email: Mapped[str] = mapped_column(String, unique=True, nullable=False)
