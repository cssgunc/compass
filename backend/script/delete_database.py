from sqlalchemy import text, create_engine
from ..database import engine, _engine_str
from ..env import getenv

engine = create_engine(_engine_str(), echo=True)
"""Application-level SQLAlchemy database engine."""

with engine.connect() as connection:
    connection.execute(
        text("COMMIT")
    )
    database = getenv("POSTGRES_DATABASE")
    stmt = text(f"DROP DATABASE IF EXISTS {database}")
    connection.execute(stmt)