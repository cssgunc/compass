"""Tests for the UserService class."""

# PyTest
import pytest

from ...services import UserService
from .fixtures import user_svc
from ...models.user_model import User
from ...models.enum_for_models import ProgramTypeEnum

from .user_test_data import employee, volunteer, admin, newUser, toDelete
from . import user_test_data


def test_create(user_svc: UserService):
    """Test creating a user"""
    user1 = user_svc.create(admin)

    print(user1)
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
    assert len(users) == 4


def test_get_user_by_id(user_svc: UserService):
    """Test getting a user by an id"""
    if volunteer.id != None:
        user = user_svc.get_user_by_id(volunteer.id)
    assert user is not None
    assert user.id is not None


def test_get_user_by_id_nonexistent(user_svc: UserService):
    """Test getting a user by id that does not exist"""
    with pytest.raises(Exception):
        user_svc.get_by_id(100)


def test_delete_user(user_svc: UserService):
    """Test deleting a user"""
    user_svc.delete(toDelete)
    with pytest.raises(Exception):
        user_svc.get_user_by_id(toDelete.id)


def test_delete_user_nonexistent(user_svc: UserService):
    """Test deleting a user that does not exist"""
    with pytest.raises(Exception):
        user_svc.delete(newUser)


def test_update_user(user_svc: UserService):
    """Test updating a user
    Updating volunteer
    """
    user = user_svc.get_user_by_id(volunteer.id)
    assert user is not None
    user.username = "volunteer 1"
    user.email = "newemail@compass.com"
    updated_user = user_svc.update(user)
    assert updated_user is not None
    assert updated_user.id == user.id
    assert updated_user.username == "volunteer 1"
    assert updated_user.email == "newemail@compass.com"


def test_update_user_nonexistent(user_svc: UserService):
    """Test updated a user that does not exist"""
    with pytest.raises(Exception):
        user_svc.update(newUser)
