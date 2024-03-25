from pydantic import BaseModel, Field
from enum import Enum
from typing import List
from datetime import datetime
from typing import Optional
from .tag_model import Tag


class ResourceTag(BaseModel):
    id: int | None = None
    resourceid: int | None = None
    tagid: Tag
