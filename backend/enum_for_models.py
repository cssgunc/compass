from pydantic import BaseModel, Field
from enum import Enum
from typing import List
from datetime import datetime
from typing import Optional


class ProgramTypeEnum(str, Enum):
    DOMESTIC = "DOMESTIC"
    ECONOMIC = "ECONOMIC"
    COMMUNITY = "COMMUNITY"


class UserTypeEnum(str, Enum):
    ADMIN = "ADMIN"
    EMPLOYEE = "EMPLOYEE"
    VOLUNTEER = "VOLUNTEER"
