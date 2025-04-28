from typing import Literal
from fastapi import Depends
from pydantic import BaseModel

from backend.entities.user_entity import UserEntity
from backend.models.user_model import User

from ..database import db_session
from sqlalchemy.orm import Session
from sqlalchemy import (
    ARRAY,
    BinaryExpression,
    String,
    Text,
    literal_column,
    or_,
    func,
    select,
    exists,
)
from ..models.resource_model import Resource
from ..models.service_model import Service
from ..entities.resource_entity import ResourceEntity
from backend.entities.service_entity import ServiceEntity


class SearchResult(BaseModel):
    type: Literal["resource", "service"]
    data: Resource | Service


class SearchService:
    def __init__(self, session: Session = Depends(db_session)):
        self._session = session

    def search(self, query_str: str) -> list[SearchResult]:
        """Searches through all tables for a string."""
        results: list[SearchResult] = []
        entities = (
            ResourceEntity,
            ServiceEntity,
        )

        for entity in entities:
            columns = entity.__table__.columns

            filters: list[BinaryExpression[bool]] = []
            for column in columns:
                if isinstance(column.type, String) or isinstance(column.type, Text):
                    filters.append(column.cast(String).ilike(f"%{query_str}%"))
                elif isinstance(column.type, ARRAY):
                    # Custom filter that checks the query string against each element in the array
                    filters.append(
                        exists(
                            select(1)
                            .select_from(
                                func.unnest(column.cast(ARRAY(String))).alias("element")
                            )
                            .where(literal_column("element").ilike(f"%{query_str}%"))
                        )
                    )

            if filters:
                query = self._session.query(entity).filter(or_(*filters))
                results.extend(
                    [
                        SearchResult(type=entity.__tablename__, data=result.to_model())
                        for result in query.all()
                    ]
                )
        return results
