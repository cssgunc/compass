from fastapi import Depends
from ..database import db_session
from sqlalchemy.orm import Session
from ..entities.user_entity import UserEntity
from ..models.user_model import User
from sqlalchemy import select


class UserService:

    def __init__(self, session: Session = Depends(db_session)):
        self._session = session


    def get_user_by_id(self) -> User: 
        """
        Gets a user by id from the database

        Returns: A User Pydantic model

        """
        user = (
            self._session.query(UserEntity)
            .filter(UserEntity.id == id)
        )

        if user is None:
            raise Exception(
            f"No user found with matching id: {id}"
            )

        return user.to_model()    

        
#get users
    def all(self) -> list[User]:
        """
        Returns a list of all Users

        """
        query = select(UserEntity)   
        entities = self._session.scalars(query).all()

        return [entity.to_model() for entity in entities]

        
#post user
    def create(self, user: User) -> User: 

        """
        Creates a new User Entity and adds to database

        Args: User model

        Returns: User model
        
        """

        #handle if id exists
        if user.id: 
                user.id = None
        
        # if does not exist, create new object
        user_entity = UserEntity.from_model(user)

        # add new user to table
        self._session.add(user_entity)
        self._session.commit()

        # return added object
        return user_entity.to_model()

