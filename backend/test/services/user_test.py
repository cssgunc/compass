"""Tests for the UserService class."""

# PyTest
import pytest

from ...models.user_model import User
from ...services import UserService

from ...models.user_model import User
from ...entities.program_enum import ProgramEnum
from ...entities.user_enum import RoleEnum
from ...entities.user_entity import UserEntity


programs = ProgramEnum
roles = RoleEnum

volunteer = User(
    id = 1,
    username="volunteer",
    email="volunteer@compass.com",
    experience="1 year",
    group="volunteers",
    programtype=[programs.ECONOMIC],
    usertype=roles.VOLUNTEER,
)

employee = User(
    id = 2,
    username="employee",
    email="employee@compass.com",
    experience="5 years",
    group="employees",
    programtype=[programs.DOMESTIC, programs.COMMUNITY],
    usertype=roles.EMPLOYEE,
)

admin = User(
    id = 3,
    username="admin",
    email="admin@compass.com",
    experience="10 years",
    group="admin",
    programtype=[programs.DOMESTIC, programs.COMMUNITY, programs.ECONOMIC],
    usertype=roles.ADMIN,
)

users=[volunteer, employee, admin]


def test_get_all():
    """Test that all users can be retrieved."""
    

    