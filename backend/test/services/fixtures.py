"""Fixtures used for testing the core services."""

import pytest
from unittest.mock import create_autospec
from sqlalchemy.orm import Session
from ...services import UserService
from ...services import TagService
from ...services import ServiceService




@pytest.fixture()
def user_svc(session: Session):
    """This fixture is used to test the UserService class"""
    return UserService(session)

@pytest.fixture()
def tag_svc(session: Session):
    """This fixture is used to test the TagService class"""
    return TagService(session)

@pytest.fixture()
def service_svc(session: Session):
    """This fixture is used to test the ServiceService class"""
    return ServiceService(session)