from pydantic import BaseModel, Field
from enum import Enum
from typing import List
from datetime import datetime
from typing import Optional

from .enum_for_models import ProgramTypeEnum
from .enum_for_models import UserTypeEnum
from .service_model import Service

from .tag_model import Tag
from pydantic import BaseModel
from datetime import datetime


class ServiceTag(Service, BaseModel):
    id: int | None = None
    serviceid: int | None = None
    tagId: Tag
