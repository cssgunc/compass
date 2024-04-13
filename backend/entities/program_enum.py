from sqlalchemy import Enum


class ProgramEnum(Enum):
    ECONOMIC = 'ECONOMIC'
    DOMESTIC = 'DOMESTIC'
    COMMUNITY = 'COMMUNITY'

    def __init__(self):
        super().__init__(name="program_enum")
