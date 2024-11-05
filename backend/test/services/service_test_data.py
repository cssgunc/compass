import pytest
from sqlalchemy.orm import Session

from ...entities import ServiceEntity
from ...models.enum_for_models import ProgramTypeEnum
from ...models import Service, Tag
from .tag_test_data import tags

service1 = Service(
    id=1,
    name="service 1",
    status="open",
    summary="presentation educating community on domestic violence",
    requirements=[""],
    program=ProgramTypeEnum.COMMUNITY,
)

service2 = Service(
    id=2,
    name="service 2",
    status="closed",
    summary="service finding safe places to stay",
    requirements=[""],
    program=ProgramTypeEnum.DOMESTIC,
)

service3 = Service(
    id=3,
    name="service 3",
    status="open",
    summary="",
    requirements=[""],
    program=ProgramTypeEnum.DOMESTIC,
)

service4 = Service(
    id=4,
    name="service 4",
    status="waitlist",
    summary="community event",
    requirements=[""],
    program=ProgramTypeEnum.COMMUNITY,
)

service5 = Service(
    id=5,
    name="service 5",
    status="open",
    summary="talk circle for victims of domestic violence",
    requirements=["18+"],
    program=ProgramTypeEnum.COMMUNITY,
)

service6 = Service(
    id=6,
    name="service 6",
    status="waitlist",
    summary="program offering economic assistance",
    requirements=[""],
    program=ProgramTypeEnum.ECONOMIC,
)

service_6_edit = Service(
    id=6,
    name="service 6",
    status="open",
    summary="program offering economic assistance",
    requirements=["18+"],
    program=ProgramTypeEnum.ECONOMIC,
)

service7 = Service(
    id=7,
    name="service 7",
    status="waitlist",
    summary="insert generic description",
    requirements=[""],
    program=ProgramTypeEnum.ECONOMIC,
)

new_service = Service(
    id=8,
    name="new service",
    status="open",
    summary="insert other generic description",
    requirements=[""],
    program=ProgramTypeEnum.DOMESTIC,
)

services = [service1, service2, service3, service4, service5, service6]

service_1 = Service(
    id=1,
    name="Crisis Hotline",
    status="open",
    summary="24/7 support for individuals in crisis",
    requirements=["Anonymous", "Confidential"],
    program=ProgramTypeEnum.DOMESTIC,
    tags=[tags[0], tags[1]],
)

service_2 = Service(
    id=2,
    name="Shelter Placement",
    status="open",
    summary="Emergency shelter for victims of domestic violence",
    requirements=["Referral required", "Safety assessment"],
    program=ProgramTypeEnum.DOMESTIC,
)

service_3 = Service(
    id=3,
    name="Legal Advocacy",
    status="waitlist",
    summary="Legal support and representation for survivors",
    requirements=["Intake required", "Income eligibility"],
    program=ProgramTypeEnum.COMMUNITY,
)

service_4 = Service(
    id=4,
    name="Counseling Services",
    status="open",
    summary="Individual and group therapy for survivors",
    requirements=["Initial assessment", "Insurance accepted"],
    program=ProgramTypeEnum.DOMESTIC,
)

service_5 = Service(
    id=5,
    name="Financial Assistance",
    status="open",
    summary="Emergency funds for survivors in need",
    requirements=["Application required", "Proof of income"],
    program=ProgramTypeEnum.ECONOMIC,
)

service_6 = Service(
    id=6,
    name="Housing Assistance",
    status="waitlist",
    summary="Support for finding safe and affordable housing",
    requirements=["Referral required", "Background check"],
    program=ProgramTypeEnum.ECONOMIC,
)

service_7 = Service(
    id=7,
    name="Job Training",
    status="open",
    summary="Employment skills training for survivors",
    requirements=["Enrollment required", "18+"],
    program=ProgramTypeEnum.ECONOMIC,
)

service_8 = Service(
    id=8,
    name="Support Groups",
    status="open",
    summary="Peer support groups for survivors",
    requirements=["Registration required", "Confidential"],
    program=ProgramTypeEnum.COMMUNITY,
)

service_9 = Service(
    id=9,
    name="Children's Services",
    status="open",
    summary="Specialized services for children exposed to domestic violence",
    requirements=["Parental consent", "Age-appropriate"],
    program=ProgramTypeEnum.DOMESTIC,
)

service_10 = Service(
    id=10,
    name="Safety Planning",
    status="open",
    summary="Personalized safety planning for survivors",
    requirements=["Confidential", "Collaborative"],
    program=ProgramTypeEnum.DOMESTIC,
)

service_11 = Service(
    id=11,
    name="Community Education",
    status="open",
    summary="Workshops and training on domestic violence prevention",
    requirements=["Open to the public", "Registration preferred"],
    program=ProgramTypeEnum.COMMUNITY,
)

service_12 = Service(
    id=12,
    name="Healthcare Services",
    status="open",
    summary="Medical care and support for survivors",
    requirements=["Referral required", "Insurance accepted"],
    program=ProgramTypeEnum.DOMESTIC,
)

service_13 = Service(
    id=13,
    name="Transportation Assistance",
    status="waitlist",
    summary="Help with transportation for survivors",
    requirements=["Eligibility assessment", "Limited availability"],
    program=ProgramTypeEnum.ECONOMIC,
)

service_14 = Service(
    id=14,
    name="Court Accompaniment",
    status="open",
    summary="Support and advocacy during court proceedings",
    requirements=["Legal case", "Scheduling required"],
    program=ProgramTypeEnum.COMMUNITY,
)

service_15 = Service(
    id=15,
    name="Relocation Assistance",
    status="waitlist",
    summary="Support for relocating to a safe environment",
    requirements=["Referral required", "Safety assessment"],
    program=ProgramTypeEnum.ECONOMIC,
)

service_16 = Service(
    id=16,
    name="Parenting Classes",
    status="open",
    summary="Education and support for parents",
    requirements=["Open to parents", "Pre-registration required"],
    program=ProgramTypeEnum.COMMUNITY,
)

service_17 = Service(
    id=17,
    name="Life Skills Training",
    status="open",
    summary="Workshops on various life skills for survivors",
    requirements=["Enrollment required", "Commitment to attend"],
    program=ProgramTypeEnum.ECONOMIC,
)

service_18 = Service(
    id=18,
    name="Advocacy Services",
    status="open",
    summary="Individual advocacy and support for survivors",
    requirements=["Intake required", "Confidential"],
    program=ProgramTypeEnum.DOMESTIC,
)

service_19 = Service(
    id=19,
    name="Volunteer Opportunities",
    status="open",
    summary="Various volunteer roles supporting the organization",
    requirements=["Background check", "Training required"],
    program=ProgramTypeEnum.COMMUNITY,
)

service_20 = Service(
    id=20,
    name="Referral Services",
    status="open",
    summary="Referrals to community resources and partner agencies",
    requirements=["Intake required", "Based on individual needs"],
    program=ProgramTypeEnum.DOMESTIC,
)

services1 = [
    service_1,
    service_2,
    service_3,
    service_4,
    service_5,
    service_6,
    service_7,
    service_8,
    service_9,
    service_10,
    service_11,
    service_12,
    service_13,
    service_14,
    service_15,
    service_16,
    service_17,
    service_18,
    service_19,
    service_20,
]

from sqlalchemy import text
from sqlalchemy.orm import Session, DeclarativeBase, InstrumentedAttribute


def reset_table_id_seq(
    session: Session,
    entity: type[DeclarativeBase],
    entity_id_column: InstrumentedAttribute[int],
    next_id: int,
) -> None:
    """Reset the ID sequence of an entity table.

    Args:
        session (Session) - A SQLAlchemy Session
        entity (DeclarativeBase) - The SQLAlchemy Entity table to target
        entity_id_column (MappedColumn) - The ID column (should be an int column)
        next_id (int) - Where the next inserted, autogenerated ID should begin

    Returns:
        None"""
    table = entity.__table__
    id_column_name = entity_id_column.name
    sql = text(f"ALTER SEQUENCe {table}_{id_column_name}_seq RESTART WITH {next_id}")
    session.execute(sql)


def insert_test_data(session: Session):
    """Inserts fake service data into the test session."""
    global services1

    # Create entities for test organization data
    entities = []
    for service in services1:
        entity = ServiceEntity.from_model(service)
        session.add(entity)
        entities.append(entity)

    # Reset table IDs to prevent ID conflicts
    reset_table_id_seq(session, ServiceEntity, ServiceEntity.id, len(services1) + 1)

    # Commit all changes
    session.commit()


def insert_fake_data(session: Session):
    """Inserts fake service data into the test session."""
    global services

    # Create entities for test organization data
    entities = []
    for service in services:
        entity = ServiceEntity.from_model(service)
        session.add(entity)
        entities.append(entity)

    # Reset table IDs to prevent ID conflicts
    reset_table_id_seq(session, ServiceEntity, ServiceEntity.id, len(services) + 1)

    # Commit all changes
    session.commit()
