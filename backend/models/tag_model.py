from pydantic import BaseModel, Field
from enum import Enum
from typing import List
from datetime import datetime
from typing import Optional


class Tag(BaseModel):
    id: int | None = None
    content: str = Field(
        ..., max_length=600, description="content associated with the tag"
    )
    created_at: datetime | None = None
