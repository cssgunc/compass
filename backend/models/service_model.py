from pydantic import BaseModel, Field
from enum import Enum
from typing import List
from datetime import datetime
from typing import Optional
from .enum_for_models import ProgramTypeEnum
from .tag_model import Tag


class Service(BaseModel):
    id: int | None = None
    created_at: datetime | None = None
    name: str
    status: str
    summary: str
    requirements: List[str]
    program: ProgramTypeEnum
    tags: List[Tag] = []
