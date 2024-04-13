import pytest  
from sqlalchemy.orm import Session
from backend.services.service import ServiceService

@pytest.fixture(autouse=True)
def service_svc(session: Session):
    return ServiceService(session)