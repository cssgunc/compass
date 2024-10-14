from pydantic import BaseModel, Field
from enum import Enum
from typing import List
from datetime import datetime
from typing import Optional
from .enum_for_models import ProgramTypeEnum


class Resource(BaseModel):
    id: int | None = None
    name: str = Field(..., max_length=150, description="The name of the resource")
    summary: str = Field(..., max_length=300, description="The summary of the resource")
    link: str = Field(..., max_length=150, description="link to the resource")
    program: ProgramTypeEnum
    created_at: Optional[datetime]
