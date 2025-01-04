from pydantic import BaseModel, Field
from enum import Enum
from typing import List
from datetime import datetime
from typing import Optional
from .enum_for_models import UserTypeEnum, ProgramTypeEnum


class User(BaseModel):
    id: int | None = None
    username: str = Field(..., description="The username of the user")
    email: str = Field(..., description="The e-mail of the user")
    experience: int | None = Field(None, description="Years of Experience of the User")
    group: str | None = Field(None, description="The group of the user")
    program: List[ProgramTypeEnum] | None = None
    role: UserTypeEnum | None = None
    created_at: Optional[datetime] = datetime.now()
    uuid: str | None = None
