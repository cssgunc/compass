""" Testing Tag Entity """

from sqlalchemy import Engine
from ... import entities
from ...entities.tag_entity import TagEntity


def test_add_sample_data_tag(session: Engine):

    """Inserts a sample data point and verifies it is in the database"""
    entity = TagEntity(content="Test tag")
    session.add(entity)
    session.commit()
    data = session.get(TagEntity, 1)
    assert data.id == 1
    assert data.content == "Test tag"
    

    