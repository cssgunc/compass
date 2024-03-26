""" Testing User Entity """

from sqlalchemy import Engine
from ... import entities
from ...entities.user_entity import UserEntity
from ...entities.user_entity import RoleEnum
from ...entities.user_entity import ProgramEnum

def test_add_sample_data_user(session: Engine):


    """Inserts a sample data point and verifies it is in the database"""
    entity = UserEntity(id=1, username="emmalynf", role=RoleEnum.ADMIN, email="efoster@unc.edu", program=[ProgramEnum.COMMUNITY, ProgramEnum.DOMESTIC, ProgramEnum.ECONOMIC], experience=10, group="group")
    session.add(entity)
    session.commit()
    data = session.get(UserEntity, 1)
    assert data.id == 1
    assert data.username == "emmalynf"
    assert data.email == "efoster@unc.edu"
    assert data.experience == 10
    assert data.role == RoleEnum.ADMIN
    assert data.program == [ProgramEnum.COMMUNITY, ProgramEnum.DOMESTIC, ProgramEnum.ECONOMIC]

    