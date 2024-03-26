from sqlalchemy import Enum


class ProgramEnum(Enum):
    ECONOMIC = "economic"
    DOMESTIC = "domestic"
    COMMUNITY = "community"

    def __init__(self):
        super().__init__(name="program_enum")
