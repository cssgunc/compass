"""Test for the Resource Service."""

# PyTest
import pytest
from unittest.mock import create_autospec

from backend.services.exceptions import ResourceNotFoundException

from ...models.resource_model import Resource
from ...models.user_model import User

from .fixtures import resource_svc


