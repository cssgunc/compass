"""Tests for the UserService class."""

# PyTest
import pytest

from ...services import UserService
from .fixtures import user_svc
from ...models.enum_for_models import ProgramTypeEnum

from .user_test_data import employee, volunteer, admin, newUser
from . import user_test_data


def test_create(user_svc: UserService):
    """Test creating a user"""
    user1 = user_svc.create(newUser)
    assert user1 is not None
    assert user1.id is not None


def test_create_id_exists(user_svc: UserService):
    """Test creating a user with id conflict"""
    user1 = user_svc.create(volunteer)
    assert user1 is not None
    assert user1.id is not None


def test_get_all(user_svc: UserService):
    """Test that all users can be retrieved."""
    users = user_svc.all()
    assert len(users) == 3


def test_get_user_by_id(user_svc: UserService):
    """Test getting a user by an id"""
    user = user_svc.get_user_by_id(volunteer.id)
    assert user is not None
    assert user.id is not None


def test_get_user_by_id_nonexistent(user_svc: UserService):
    """Test getting a user by id that does not exist"""
    with pytest.raises(Exception):
        user_svc.get_by_id(5)
