from pydantic import BaseModel, Field
from enum import Enum
from typing import List
from datetime import datetime
from typing import Optional
from .tag_model import Tag
from .resource_model import Resource


class ResourceTag(Resource, BaseModel):
    id: int | None = None
    resourceid: int | None = None
    tagid: List[Tag]
