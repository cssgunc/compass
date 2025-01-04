from fastapi import Depends
from ..database import db_session
from sqlalchemy.orm import Session
from ..entities.user_entity import UserEntity
from ..models.user_model import User
from sqlalchemy import select


class UserService:

    def __init__(self, session: Session = Depends(db_session)):
        self._session = session

    def get_user_by_id(self, id: int) -> User:
        """
        Gets a user by id from the database

        Returns: A User Pydantic model

        """
        query = select(UserEntity).where(UserEntity.id == id)
        user_entity: UserEntity | None = self._session.scalar(query)

        if user_entity is None:
            raise Exception(f"No user found with matching id: {id}")

        return user_entity.to_model()

    def get_user_by_uuid(self, uuid: str) -> User:
        """
        Gets a user by uuid from the database

        Returns: A User Pydantic model

        """
        query = select(UserEntity).where(UserEntity.uuid == uuid)
        user_entity: UserEntity | None = self._session.scalar(query)

        if user_entity is None:
            raise Exception(f"No user found with matching uuid: {uuid}")

        return user_entity.to_model()

    def all(self) -> list[User]:
        """
        Returns a list of all Users

        """
        query = select(UserEntity)
        entities = self._session.scalars(query).all()

        return [entity.to_model() for entity in entities]

    def create(self, user: User) -> User:
        """
        Creates a new User Entity and adds to database

        Args: User model

        Returns: User model

        """
        try:
            if user.id != None:
                user = self.get_user_by_id(user.id)
            else:
                user_entity = UserEntity.from_model(user)
                # add new user to table
                self._session.add(user_entity)
                self._session.commit()
        except:
            raise Exception(f"Failed to create user")

        return user

    def delete(self, user: User) -> None:
        """
        Delete a user

        Args: the user to delete

        Returns: none
        """
        obj = self._session.get(UserEntity, user.id)

        if obj is None:
            raise Exception(f"No matching user found")

        self._session.delete(obj)
        self._session.commit()

    def update(self, user: User) -> User:
        """
        Updates a user

        Args: User to be updated

        Returns: The updated User
        """
        obj = self._session.get(UserEntity, user.id)

        if obj is None:
            raise Exception(f"No matching user found")

        obj.username = user.username
        obj.role = user.role
        obj.email = user.email
        obj.program = user.program
        obj.experience = user.experience
        obj.group = user.group

        self._session.commit()

        return obj.to_model()
