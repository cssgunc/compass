"""Sample Test File"""

from sqlalchemy import Engine, select

from ... import entities
from ...entities.sample_entity import SampleEntity


def test_entity_count():
    """Checks the number of entities to be inserted"""
    print(entities.EntityBase.metadata.tables.keys())
    assert len(entities.EntityBase.metadata.tables.keys()) == 1


def test_add_sample_data(session: Engine):
    """Inserts a sample data point and verifies it is in the database"""
    entity = SampleEntity(name="Praj", age=19, email="pmoha@unc.edu")
    session.add(entity)
    session.commit()
    data = session.get(SampleEntity, 1)
    assert data.name == "Praj"
