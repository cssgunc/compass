from fastapi import Depends
from ..database import db_session
from sqlalchemy.orm import Session

from ..models.user_model import User
from ..entities.user_entity import UserEntity
from exceptions import ResourceNotFoundException, UserPermissionException
from ..models.enum_for_models import UserTypeEnum


class PermissionsService:

    def __init__(self, session: Session = Depends(db_session)):
        self._session = session

    def get_role_permissions(self, user: User) -> str:
        """
        Gets a str group based on the user

        Returns:
            str
        """

        # Query the resource table with id
        obj = (
            self._session.query(UserEntity)
            .filter(UserEntity.id == user.id)
            .one_or_none()
        )

        # Check if result is null
        if obj is None:
            raise ResourceNotFoundException(
                f"No user permissions found for user with id: {user.id}"
            )

        return obj.role
