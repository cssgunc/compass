"""Shared pytest fixtures for database dependent tests."""

import pytest
from sqlalchemy import Engine
from sqlalchemy.orm import Session

from ...database import db_session


@pytest.fixture(scope="session")
def test_engine() -> Engine:
    session = db_session()
    return session


@pytest.fixture(scope="function")
def session(test_engine: Engine):
    # entities.EntityBase.metadata.drop_all(test_engine)
    # entities.EntityBase.metadata.create_all(test_engine)
    session = Session(test_engine)
    try:
        yield session
    finally:
        session.close()
