from sqlalchemy import create_engine
import subprocess

from ..database import engine, _engine_str
from ..env import getenv
from .. import entities

database = getenv("POSTGRES_DATABASE")

engine = create_engine(_engine_str(), echo=True)
"""Application-level SQLAlchemy database engine."""

# Run Delete and Create Database Scripts
subprocess.run(["python3", "-m", "backend.script.delete_database"])
subprocess.run(["python3", "-m", "backend.script.create_database"])

entities.EntityBase.metadata.drop_all(engine)
entities.EntityBase.metadata.create_all(engine)
