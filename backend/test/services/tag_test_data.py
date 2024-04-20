
import pytest
from sqlalchemy.orm import Session
from datetime import datetime
# from ...models.tag_model import Tag
from backend.entities.tag_entity import TagEntity
from sqlalchemy import text
from sqlalchemy.orm import DeclarativeBase, InstrumentedAttribute

# Define sample tag data
tag1 = Tag(id=1, content="Tag 1", created_at=datetime.now())
tag2 = Tag(id=2, content="Tag 2", created_at=datetime.now())
tag3 = Tag(id=3, content="Tag 3", created_at=datetime.now())
tagToCreate = Tag(id=4, content="Tag 4", created_at=datetime.now())
tags = [tag1, tag2, tag3]

# Function to reset table ID sequence
def reset_table_id_seq(session: Session, entity: type[DeclarativeBase], entity_id_column: InstrumentedAttribute[int], next_id: int) -> None:
    """Reset the ID sequence of an entity table."""
    table = entity.__table__
    id_column_name = entity_id_column.name
    sql = text(f"ALTER SEQUENCE {table}_{id_column_name}_seq RESTART WITH {next_id}")
    session.execute(sql)

# Function to insert fake data
def insert_fake_data(session: Session):
    """Inserts fake tag data into the test session."""
    global tags
    entities = []
    for tag in tags:
        entity = TagEntity.from_model(tag)
        session.add(entity)
        entities.append(entity)
    reset_table_id_seq(session, TagEntity, TagEntity.id, len(tags) + 1)
    session.commit()

# Fixture to automatically insert fake data into the session
@pytest.fixture(autouse=True)
def fake_data_fixture(session: Session):
    """Insert fake data into the session automatically when the test is run."""
    insert_fake_data(session)
    session.commit()
    yield
