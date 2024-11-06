from pydantic import BaseModel, Field
from enum import Enum
from typing import List
from datetime import datetime
from typing import Optional
from .enum_for_models import ProgramTypeEnum


class Service(BaseModel):
    id: int | None = None
    created_at: datetime | None = datetime.now()
    name: str
    status: str
    summary: str
    requirements: List[str]
    program: ProgramTypeEnum
