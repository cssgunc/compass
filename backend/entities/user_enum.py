from sqlalchemy import Enum


class RoleEnum(Enum):
    """Determine role for User"""

    ADMIN = "ADMIN"
    EMPLOYEE = "EMPLOYEE"
    VOLUNTEER = "VOLUNTEER"

    def __init__(self):
        super().__init__(name="role_enum")
