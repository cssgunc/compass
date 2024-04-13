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
            raise Exception(
            f"No user found with matching id: {id}"
            )

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
            user_entity = self.get_user_by_id(user.id)
        except:
            # if does not exist, create new object
            user_entity = UserEntity.from_model(user)

            # add new user to table
            self._session.add(user_entity)
            self._session.commit()
        finally:
            # return added object
            return user_entity.to_model()

