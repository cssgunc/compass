<<<<<<< HEAD
from compass.backend.organization_entity import text, create_engine
from ..database import engine, _engine_str
from ..env import getenv

engine = create_engine(_engine_str(database=""), echo=True)
"""Application-level SQLAlchemy database engine."""

with engine.connect() as connection:
    connection.execute(
        text("COMMIT")
    )
    database = getenv("POSTGRES_DATABASE")
    stmt = text(f"DROP DATABASE IF EXISTS {database}")
=======
from sqlalchemy import text, create_engine
from ..database import engine, _engine_str
from ..env import getenv

engine = create_engine(_engine_str(database=""), echo=True)
"""Application-level SQLAlchemy database engine."""

with engine.connect() as connection:
    connection.execute(
        text("COMMIT")
    )
    database = getenv("POSTGRES_DATABASE")
    stmt = text(f"DROP DATABASE IF EXISTS {database}")
>>>>>>> 7068d74c6d04be020293acacf6cbe476b745c6fa
    connection.execute(stmt)