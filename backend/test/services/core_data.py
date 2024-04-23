import pytest
from sqlalchemy.orm import Session
from . import resource_data


@pytest.fixture(autouse=True)
def setup_insert_data_fixture(session: Session):
    resource_data.insert_fake_data(session)

    session.commit()
    yield
