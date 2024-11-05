from pydantic import BaseModel, Field
from enum import Enum
from typing import List
from datetime import datetime
from typing import Optional

from .tag_model import Tag
from pydantic import BaseModel
from datetime import datetime


class ServiceTag(BaseModel):
    id: int | None = None
    serviceId: int | None = None
    tagId: int
