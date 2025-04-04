from fastapi import Depends
from ..database import db_session
from sqlalchemy.orm import Session
from sqlalchemy import or_, select
from ..models.resource_model import Resource
from ..models.service_model import Service
from ..entities.resource_entity import ResourceEntity
from backend.entities.service_entity import ServiceEntity
from ..models.user_model import User, UserTypeEnum


class SearchService:
    def __init__(self, session: Session = Depends(db_session)):
        self._session = session

    def search(self, query_str: str) -> list[Resource | Service]:
        results = []
        models = [
            ResourceEntity,
            ServiceEntity,
        ]

        for model in models:
            columns = [column for column in model.__table__.columns]
            
            filters = [
                column.ilike(f"%{query_str}%")
                for column in columns
                if column.type.__class__.__name__ in ["String", "Text"]
            ]

            if filters:
                query = self._session.query(model).filter(or_(*filters))
                results.extend(query.all())

        return results

