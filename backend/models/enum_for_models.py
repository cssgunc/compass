from enum import Enum


class ProgramTypeEnum(str, Enum):
    DOMESTIC = "DOMESTIC"
    ECONOMIC = "ECONOMIC"
    COMMUNITY = "COMMUNITY"


class UserTypeEnum(str, Enum):
    ADMIN = "ADMIN"
    EMPLOYEE = "EMPLOYEE"
    VOLUNTEER = "VOLUNTEER"
