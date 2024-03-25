import enum


class RoleType(enum.Enum):
    """Determine role for User"""

    ADMIN = "ADMIN"
    EMPLOYEE = "EMPLOYEE"
    VOLUNTEER = "VOLUNTEER"
