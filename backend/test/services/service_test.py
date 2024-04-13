from unittest.mock import create_autospec
import pytest

from backend.models.service_model import Service
from backend.entities.service_entity import ServiceEntity
from backend.enum_for_models import ProgramTypeEnum
from backend.services.exceptions import ServiceNotFoundException