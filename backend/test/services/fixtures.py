import pytest  
from sqlalchemy.orm import Session
from backend.services.service import ServiceService

@pytest.fixture()
def service_svc(session: Session):
    return ServiceService(session)