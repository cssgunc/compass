import pytest
from sqlalchemy.orm import Session
from backend.entities.service_entity import ServiceEntity
from backend.models.service_model import Service
from backend.enum_for_models import ProgramTypeEnum

service_1 = Service(
    name = "service 1",
    status= "open",
    summary= "presentation educating community on domestic violence",
    requirements= [""],
    program= ProgramTypeEnum.COMMUNITY
)

service_2 = Service(
    name = "service 2",
    status= "closed",
    summary= "service finding safe places to stay",
    requirements= [""],
    program= ProgramTypeEnum.DOMESTIC
)

service_3 = Service(
    name = "service 3",
    status= "open",
    summary= "",
    requirements= [""],
    program= ProgramTypeEnum.DOMESTIC
)

service_4 = Service(
    name = "service 4",
    status= "waitlist",
    summary= "community event",
    requirements= [""],
    program= ProgramTypeEnum.COMMUNITY
)

service_5 = Service(
    name = "service 5",
    status= "open",
    summary= "talk circle for victims of domestic violence",
    requirements= ["18+"],
    program= ProgramTypeEnum.COMMUNITY
)

service_6 = Service(
    name = "service 6",
    status= "waitlist",
    summary= "program offering economic assistance",
    requirements= [""],
    program= ProgramTypeEnum.ECONOMIC
)

service_6_edit = Service(
    name = "service 6",
    status= "open",
    summary= "program offering economic assistance",
    requirements= ["18+"],
    program= ProgramTypeEnum.ECONOMIC
)

service_7 = Service(
    name = "service 7",
    status= "waitlist",
    summary= "insert generic description",
    requirements= [""],
    program= ProgramTypeEnum.ECONOMIC
)

new_service = Service(
    name = "new service",
    status= "open",
    summary= "insert other generic description",
    requirements= [""],
    program= ProgramTypeEnum.DOMESTIC
)

services = [service_1, service_2, service_3, service_4, service_5, service_6]

def insert_fake_data(session: Session):
    for service in services:
        entity = ServiceEntity.from_model(service)
        session.add(entity)

@pytest.fixture(autouse=True)
def fake_data_fixture(session: Session):
    insert_fake_data(session)
    session.commit()