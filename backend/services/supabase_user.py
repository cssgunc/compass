from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select
from supabase import create_client, Client
import os

from ..database import db_session
from ..entities.user_entity import UserEntity
from ..models.user_model import User
from backend.services.user import UserService
from ..models.enum_for_models import ProgramTypeEnum, UserTypeEnum


class SupabaseUserService:
    def __init__(self, session: Session = Depends(db_session)):
        self._session = session
        self.client = create_client(
            os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY")
        )

    def get_user(self, id: str) -> User:
        """
        Gets a user by id from the database
        Returns: A User Pydantic model
        """
        query = select(UserEntity).where(UserEntity.uuid == id)
        result = self._session.execute(query)
        user_entity = result.scalar_one_or_none()

        if user_entity is None:
            raise HTTPException(
                status_code=404, detail=f"No user found with matching id: {id}"
            )

        return user_entity.to_model()

    def create_user(self, email: str, password: str, role: UserTypeEnum) -> User:
        """
        Creates a new User Entity and adds to database
        Args: email and password
        Returns: User model
        """
        try:
            if not email and not password:
                raise HTTPException(
                    status_code=400, detail="Email and password required"
                )

            # Create user in Supabase Auth
            auth_response = self.client.auth.sign_up(
                {"email": email, "password": password}
            )

            if auth_response.user is None:
                raise HTTPException(
                    status_code=400,
                    detail=f"Supabase auth error: {auth_response}",
                )

            supabase_user = auth_response.user

            # Create user in database using existing UserService
            randomUserName = email.split("@")[0]  # Simple username generation
            user_model = User(
                uuid=supabase_user.id,
                email=email,
                username=randomUserName,
                role=role,
                program=[ProgramTypeEnum.DOMESTIC],
                experience=0,
                group="volunteer",
            )
            user_entity = UserEntity.from_model(user_model)
            # add new user to table
            self._session.add(user_entity)
            self._session.commit()

        except:
            raise Exception(f"Failed to create user")

        return user_entity.to_model()

    def delete_user(self, user_id: int) -> None:
        """
        Delete a user
        Args: the user ID to delete
        Returns: none
        """

        obj = self._session.get(UserEntity, user_id)  # Get user entity from database

        if obj is None:
            raise HTTPException(status_code=404, detail=f"No matching user found")

        try:
            # Delete user from Supabase Auth
            # This is commented out because it may not be necessary to delete the user from Supabase Auth
            # self.client.auth.admin.delete_user(obj.uuid, should_soft_delete=False)

            # Delete user from database
            self._session.delete(obj)
            self._session.commit()
        except Exception as e:
            self._session.rollback()
            raise HTTPException(
                status_code=500, detail=f"Failed to delete user: {str(e)}"
            )

    def update_user(self, user: User) -> User:
        """
        Updates a user
        Args: User to be updated
        Returns: The updated User
        """
        obj = self._session.get(UserEntity, user.id)

        if obj is None:
            raise Exception(f"No matching user found")

        obj.username = user.username if user.username else obj.username
        obj.role = user.role if user.role else obj.role
        obj.email = user.email if user.email else obj.email
        obj.program = user.program if user.program else obj.program
        obj.experience = user.experience if user.experience else obj.experience
        obj.group = user.group if user.group else obj.group

        self._session.commit()

        return obj.to_model()

    def get_user_by_email(self, email: str) -> User:
        """
        Gets a user by email from the database
        Returns: A User Pydantic model
        """
        query = select(UserEntity).where(UserEntity.email == email)
        result = self._session.execute(query)
        user_entity = result.scalar_one_or_none()

        if user_entity is None:
            raise HTTPException(
                status_code=404, detail=f"No user found with email: {email}"
            )

        return user_entity.to_model()

    def login_user(self, email: str, password: str):
        """
        Login user with Supabase Auth
        Returns: Auth session data
        """
        try:
            auth_response = self.client.auth.sign_in_with_password(
                {"email": email, "password": password}
            )

            if auth_response.error:
                raise HTTPException(status_code=401, detail="Invalid login credentials")

            # You can then fetch the user from your database if needed
            user = self.get_user(auth_response.user.id)

            return {"user": user, "session": auth_response.session}
        except Exception as e:
            if isinstance(e, HTTPException):
                raise e
            raise HTTPException(status_code=500, detail=f"Login failed: {str(e)}")

    def logout_user(self):
        """
        Logout user from Supabase Auth
        Returns: None
        """
        try:
            self.client.auth.sign_out()
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Logout failed: {str(e)}")

    def forgot_password(self, email: str):
        """
        Send a password reset email to the user
        Returns: None
        """
        try:
            response = self.client.auth.reset_password_for_email(email)
        except Exception as e:
            raise HTTPException(
                status_code=500, detail=f"Error sending reset email: {str(e)}"
            )

    def update_password(self, password: str):
        """
        Update the user's password
        Returns: None
        """
        try:
            response = self.client.auth.update_user({"password": password})
        except Exception as e:
            raise HTTPException(
                status_code=500, detail=f"Error updating password: {str(e)}"
            )
