"""Shared pytest fixtures for database dependent tests."""

import pytest
from sqlalchemy import Engine, create_engine, text
from sqlalchemy.orm import Session
from sqlalchemy.exc import OperationalError
from .services import (
    user_test_data,
    tag_test_data,
    service_test_data,
    resource_test_data,
)

from ..database import _engine_str
from ..env import getenv
from .. import entities
from ..services import TagService

POSTGRES_DATABASE = f'{getenv("POSTGRES_DATABASE")}_test'
POSTGRES_USER = getenv("POSTGRES_USER")


def reset_database():
    engine = create_engine(_engine_str(database=""))
    with engine.connect() as connection:
        try:
            conn = connection.execution_options(autocommit=False)
            conn.execute(text("ROLLBACK"))  # Get out of transactional mode...
            conn.execute(text(f"DROP DATABASE IF EXISTS {POSTGRES_DATABASE}"))
        except OperationalError:
            print(
                "Could not drop database because it's being accessed by others (psql open?)"
            )
            exit(1)

        conn.execute(text(f"CREATE DATABASE {POSTGRES_DATABASE}"))
        conn.execute(
            text(
                f"GRANT ALL PRIVILEGES ON DATABASE {POSTGRES_DATABASE} TO {POSTGRES_USER}"
            )
        )


@pytest.fixture(scope="session")
def test_engine() -> Engine:
    reset_database()
    return create_engine(_engine_str(POSTGRES_DATABASE))


@pytest.fixture(scope="function")
def session(test_engine: Engine):
    entities.EntityBase.metadata.drop_all(test_engine)
    entities.EntityBase.metadata.create_all(test_engine)
    session = Session(test_engine)
    try:
        yield session
    finally:
        session.close()


@pytest.fixture(autouse=True)
def setup_insert_data_fixture(session: Session):
    user_test_data.insert_fake_data(session)
    tag_test_data.insert_fake_data(session)
    service_test_data.insert_fake_data(session)
    resource_test_data.insert_fake_data(session)
    session.commit()
    yield


@pytest.fixture()
def tag_svc(session: Session):
    """This fixture is used to test the TagService class"""
    return TagService(session)
