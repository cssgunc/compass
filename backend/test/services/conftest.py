"""Shared pytest fixtures for database dependent tests."""

import pytest
from sqlalchemy import Engine
from sqlalchemy.orm import Session
import subprocess

from ...database import db_session


@pytest.fixture(scope="session")
def test_engine() -> Engine:
    subprocess.run(["python3", "-m", "backend.script.create_database"])
    session = db_session()
    return session


@pytest.fixture(scope="function")
def session(test_engine: Engine):
    session = Session(test_engine)
    try:
        yield session
    finally:
        session.close()
