"""Fixtures used for testing the core services."""

import pytest
from unittest.mock import create_autospec
from sqlalchemy.orm import Session
from ...services.resouce import ResourceService


@pytest.fixture()
def resource_svc(session: Session):
    return ResourceService(session)
