from fastapi import Depends
from ..database import db_session
from sqlalchemy.orm import Session
from ..models.tag_model import Tag
from ..entities.tag_entity import TagEntity
from sqlalchemy import select


class TagService:

    def __init__(self, session: Session = Depends(db_session)):
        self._session = session

    def all(self) -> list[Tag]:
        """Returns a list of all Tags"""

        query = select(TagEntity)   
        entities = self._session.scalars(query).all()

        return [entity.to_model() for entity in entities]
