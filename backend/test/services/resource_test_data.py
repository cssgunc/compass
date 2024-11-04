from sqlalchemy.orm import Session
from datetime import datetime

from ...entities import ResourceEntity
from ...models.enum_for_models import ProgramTypeEnum
from ...models.resource_model import Resource

resource1 = Resource(
    id=1,
    name="Resource 1",
    summary="Helpful information for victims of domestic violence",
    link="https://example.com/resource1",
    program=ProgramTypeEnum.DOMESTIC,
    created_at=datetime(2023, 6, 1, 10, 0, 0),
)

resource2 = Resource(
    id=2,
    name="Resource 2",
    summary="Legal assistance resources",
    link="https://example.com/resource2",
    program=ProgramTypeEnum.COMMUNITY,
    created_at=datetime(2023, 6, 2, 12, 30, 0),
)

resource3 = Resource(
    id=3,
    name="Resource 3",
    summary="Financial aid resources",
    link="https://example.com/resource3",
    program=ProgramTypeEnum.ECONOMIC,
    created_at=datetime(2023, 6, 3, 15, 45, 0),
)

resource4 = Resource(
    id=4,
    name="Resource 4",
    summary="Counseling and support groups",
    link="https://example.com/resource4",
    program=ProgramTypeEnum.DOMESTIC,
    created_at=datetime(2023, 6, 4, 9, 15, 0),
)

resource5 = Resource(
    id=5,
    name="Resource 5",
    summary="Shelter and housing resources",
    link="https://example.com/resource5",
    program=ProgramTypeEnum.DOMESTIC,
    created_at=datetime(2023, 6, 5, 11, 30, 0),
)

resource6 = Resource(
    id=6,
    name="Resource 6",
    summary="New Financial Resource",
    link="https://example.com/resource6",
    program=ProgramTypeEnum.ECONOMIC,
    created_at=datetime(2024, 6, 5, 11, 30, 0),
)

resource5_new = Resource(
    id=5,
    name="Resource 5",
    summary = "Updated shelter and housing resources",
    link="https://example.com/resource5/new",
    program=ProgramTypeEnum.DOMESTIC,
    created_at=datetime(2023, 6, 5, 11, 30, 0),
)

resources = [resource1, resource2, resource3, resource4, resource5]

resource_1 = Resource(
    id=1,
    name="National Domestic Violence Hotline",
    summary="24/7 confidential support for victims of domestic violence",
    link="https://www.thehotline.org",
    program=ProgramTypeEnum.DOMESTIC,
    created_at=datetime(2023, 6, 1, 10, 0, 0),
)

resource_2 = Resource(
    id=2,
    name="Legal Aid Society",
    summary="Free legal assistance for low-income individuals",
    link="https://www.legalaidnyc.org",
    program=ProgramTypeEnum.COMMUNITY,
    created_at=datetime(2023, 6, 2, 12, 30, 0),
)

resource_3 = Resource(
    id=3,
    name="Financial Empowerment Center",
    summary="Free financial counseling and education services",
    link="https://www1.nyc.gov/site/dca/consumers/get-free-financial-counseling.page",
    program=ProgramTypeEnum.ECONOMIC,
    created_at=datetime(2023, 6, 3, 15, 45, 0),
)

resource_4 = Resource(
    id=4,
    name="National Coalition Against Domestic Violence",
    summary="Resources and support for victims of domestic violence",
    link="https://ncadv.org",
    program=ProgramTypeEnum.DOMESTIC,
    created_at=datetime(2023, 6, 4, 9, 15, 0),
)

resource_5 = Resource(
    id=5,
    name="Safe Horizon",
    summary="Shelter and support services for victims of violence",
    link="https://www.safehorizon.org",
    program=ProgramTypeEnum.DOMESTIC,
    created_at=datetime(2023, 6, 5, 11, 30, 0),
)

resource_6 = Resource(
    id=6,
    name="National Sexual Assault Hotline",
    summary="24/7 confidential support for survivors of sexual assault",
    link="https://www.rainn.org",
    program=ProgramTypeEnum.COMMUNITY,
    created_at=datetime(2023, 6, 6, 14, 0, 0),
)

resource_7 = Resource(
    id=7,
    name="Victim Compensation Fund",
    summary="Financial assistance for victims of crime",
    link="https://ovc.ojp.gov/program/victim-compensation",
    program=ProgramTypeEnum.ECONOMIC,
    created_at=datetime(2023, 6, 7, 16, 45, 0),
)

resource_8 = Resource(
    id=8,
    name="Battered Women's Justice Project",
    summary="Legal and technical assistance for victims of domestic violence",
    link="https://www.bwjp.org",
    program=ProgramTypeEnum.DOMESTIC,
    created_at=datetime(2023, 6, 8, 10, 30, 0),
)

resource_9 = Resource(
    id=9,
    name="National Network to End Domestic Violence",
    summary="Advocacy and resources for ending domestic violence",
    link="https://nnedv.org",
    program=ProgramTypeEnum.COMMUNITY,
    created_at=datetime(2023, 6, 9, 13, 0, 0),
)

resource_10 = Resource(
    id=10,
    name="Economic Justice Project",
    summary="Promoting economic security for survivors of domestic violence",
    link="https://www.njep.org",
    program=ProgramTypeEnum.ECONOMIC,
    created_at=datetime(2023, 6, 10, 15, 15, 0),
)

resource_11 = Resource(
    id=11,
    name="Domestic Violence Legal Hotline",
    summary="Free legal advice for victims of domestic violence",
    link="https://www.womenslaw.org/find-help/national/hotlines",
    program=ProgramTypeEnum.DOMESTIC,
    created_at=datetime(2023, 6, 11, 9, 0, 0),
)

resource_12 = Resource(
    id=12,
    name="National Resource Center on Domestic Violence",
    summary="Comprehensive information and resources on domestic violence",
    link="https://nrcdv.org",
    program=ProgramTypeEnum.COMMUNITY,
    created_at=datetime(2023, 6, 12, 11, 30, 0),
)

resource_13 = Resource(
    id=13,
    name="Financial Assistance for Victims of Crime",
    summary="Funding for expenses related to victimization",
    link="https://ovc.ojp.gov/program/victim-assistance-funding",
    program=ProgramTypeEnum.ECONOMIC,
    created_at=datetime(2023, 6, 13, 14, 45, 0),
)

resource_14 = Resource(
    id=14,
    name="National Clearinghouse for the Defense of Battered Women",
    summary="Legal resources and support for battered women",
    link="https://www.ncdbw.org",
    program=ProgramTypeEnum.DOMESTIC,
    created_at=datetime(2023, 6, 14, 10, 0, 0),
)

resource_15 = Resource(
    id=15,
    name="Victim Connect Resource Center",
    summary="Referral helpline for crime victims",
    link="https://victimconnect.org",
    program=ProgramTypeEnum.COMMUNITY,
    created_at=datetime(2023, 6, 15, 13, 15, 0),
)

resource_16 = Resource(
    id=16,
    name="Economic Empowerment Program",
    summary="Financial literacy and job readiness training for survivors",
    link="https://www.purplepurse.com",
    program=ProgramTypeEnum.ECONOMIC,
    created_at=datetime(2023, 6, 16, 16, 30, 0),
)

resource_17 = Resource(
    id=17,
    name="National Domestic Violence Law Project",
    summary="Legal information and resources for domestic violence survivors",
    link="https://www.womenslaw.org",
    program=ProgramTypeEnum.DOMESTIC,
    created_at=datetime(2023, 6, 17, 9, 45, 0),
)

resource_18 = Resource(
    id=18,
    name="Victim Rights Law Center",
    summary="Free legal services for victims of sexual assault",
    link="https://victimrights.org",
    program=ProgramTypeEnum.COMMUNITY,
    created_at=datetime(2023, 6, 18, 12, 0, 0),
)

resource_19 = Resource(
    id=19,
    name="Financial Justice Project",
    summary="Advocating for economic justice for survivors of violence",
    link="https://www.financialjusticeproject.org",
    program=ProgramTypeEnum.ECONOMIC,
    created_at=datetime(2023, 6, 19, 15, 30, 0),
)

resource_20 = Resource(
    id=20,
    name="National Center on Domestic and Sexual Violence",
    summary="Training and resources to end domestic and sexual violence",
    link="http://www.ncdsv.org",
    program=ProgramTypeEnum.DOMESTIC,
    created_at=datetime(2023, 6, 20, 10, 15, 0),
)

resources1 = [
    resource_1,
    resource_2,
    resource_3,
    resource_4,
    resource_5,
    resource_6,
    resource_7,
    resource_8,
    resource_9,
    resource_10,
    resource_11,
    resource_12,
    resource_13,
    resource_14,
    resource_15,
    resource_16,
    resource_17,
    resource_18,
    resource_19,
    resource_20,
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
    """Inserts fake resource data into the test session."""
    global resources1
    # Create entities for test resource data
    entities = []
    for resource in resources1:
        entity = ResourceEntity.from_model(resource)
        session.add(entity)
        entities.append(entity)

    # Reset table IDs to prevent ID conflicts
    reset_table_id_seq(session, ResourceEntity, ResourceEntity.id, len(resources1) + 1)

    # Commit all changes
    session.commit()


def insert_fake_data(session: Session):
    """Inserts fake resource data into the test session."""
    global resources
    # Create entities for test resource data
    entities = []
    for resource in resources:
        entity = ResourceEntity.from_model(resource)
        session.add(entity)
        entities.append(entity)

    # Reset table IDs to prevent ID conflicts
    reset_table_id_seq(session, ResourceEntity, ResourceEntity.id, len(resources) + 1)

    # Commit all changes
    session.commit()