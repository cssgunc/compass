import pytest
from sqlalchemy.orm import Session
from ...models.tag_model import Tag

from ...entities.tag_entity import TagEntity
from datetime import datetime

tag1 = Tag(id=1, content="Tag 1", created_at=datetime.now())

tag2 = Tag(id=2, content="Tag 2", created_at=datetime.now())

tag3 = Tag(id=3, content="Tag 3", created_at=datetime.now())

tagToCreate = Tag(id=4, content="Tag 4", created_at=datetime.now())

tags = [tag1, tag2, tag3]


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


def insert_fake_data(session: Session):
    """Inserts fake organization data into the test session."""

    global tags

    # Create entities for test organization data
    entities = []
    for tag in tags:
        entity = TagEntity.from_model(tag)
        session.add(entity)
        entities.append(entity)

    # Reset table IDs to prevent ID conflicts
    reset_table_id_seq(session, TagEntity, TagEntity.id, len(tags) + 1)

    # Commit all changes
    session.commit()


@pytest.fixture(autouse=True)
def fake_data_fixture(session: Session):
    """Insert fake data the session automatically when test is run.
    Note:
        This function runs automatically due to the fixture property `autouse=True`.
    """
    insert_fake_data(session)
    session.commit()
    yield
