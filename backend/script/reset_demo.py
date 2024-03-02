from sqlalchemy import text, create_engine
from ..database import engine
from ..env import getenv
from .. import entities

database = getenv("POSTGRES_DATABASE")


def _engine_str() -> str:
    """Helper function for reading settings from environment variables to produce connection string."""
    dialect = "postgresql+psycopg2"
    user = getenv("POSTGRES_USER")
    password = getenv("POSTGRES_PASSWORD")
    host = getenv("POSTGRES_HOST")
    port = getenv("POSTGRES_PORT")
    return f"{dialect}://{user}:{password}@{host}:{port}"


engine = create_engine(_engine_str(), echo=True)
"""Application-level SQLAlchemy database engine."""


with engine.connect() as connection:
    connection.execute(
        text("COMMIT")
    )
    database = getenv("POSTGRES_DATABASE")
    stmt = text(f"DROP DATABASE IF EXISTS {database}")
    connection.execute(stmt)
    connection.execute(
        text("COMMIT")
    )
    database = getenv("POSTGRES_DATABASE")
    stmt = text(f"CREATE DATABASE {database}")
    connection.execute(stmt)

entities.EntityBase.metadata.drop_all(engine)
entities.EntityBase.metadata.create_all(engine)
