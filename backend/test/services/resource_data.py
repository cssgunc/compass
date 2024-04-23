import pytest
from sqlalchemy.orm import Session
from ...models.resource_model import Resource
from ...entities.resource_entity import ResourceEntity
from ...models.enum_for_models import ProgramTypeEnum

from . import reset_table_id_seq


resource1 = Resource(
    id=1,
    name="resource1",
    summary="This is the first resource.",
    link="cs.unc.edu",
    programtype=ProgramTypeEnum.COMMUNITY,
    created_at=None,
)

resource2 = Resource(
    id=2,
    name="resource2",
    summary="This is the second resource.",
    link="cs.unc.edu",
    programtype=ProgramTypeEnum.ECONOMIC,
    created_at=None,
)

resource3 = Resource(
    id=3,
    name="resource3",
    summary="This is the third resource.",
    link="cs.unc.edu",
    programtype=ProgramTypeEnum.DOMESTIC,
    created_at=None,
)

resources = [resource1, resource2, resource3]


def insert_fake_data(session: Session):
    global resources
    entities = []
    for resource in resources:
        entity = ResourceEntity.from_model(resource)
        session.add(entity)
        entities.append(entity)

    reset_table_id_seq(session, ResourceEntity, ResourceEntity.id, len(resources) + 1)

    session.commit()
