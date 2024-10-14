from fastapi import Depends

from backend.models.enum_for_models import UserTypeEnum
from backend.models.user_model import User
from backend.services.exceptions import TagNotFoundException
from ..database import db_session
from sqlalchemy.orm import Session
from ..models.tag_model import Tag
from ..entities.tag_entity import TagEntity
from sqlalchemy import select

# Add in checks for user permission?
class TagService:

    def __init__(self, session: Session = Depends(db_session)):
        self._session = session

    def get_all(self) -> list[Tag]:
        """Returns a list of all Tags"""
        query = select(TagEntity)   
        entities = self._session.scalars(query).all()

        return [entity.to_model() for entity in entities]

    def create(self, subject: User, tag: Tag) -> Tag:
        entity = TagEntity.from_model(tag)
        self._session.add(entity)
        self._session.commit()
        return entity.to_model()

    def update(self, subject: User, tag: Tag) -> Tag:
        query = select(TagEntity).where(TagEntity.id == tag.id)
        entity = self._session.scalars(query).one_or_none()

        if entity is None:
            raise TagNotFoundException(f"Tag with id {tag.id} does not exist")
        
        entity.content = tag.content
        self._session.commit()
        return entity.to_model()
        

    def delete(self, subject: User, tag: Tag) -> None:
        query = select(TagEntity).where(TagEntity.id == tag.id)
        entity = self._session.scalars(query).one_or_none()

        if entity is None:
            raise TagNotFoundException(f"Tag with id {tag.id} does not exist")

        self._session.delete(entity)
        self._session.commit()

