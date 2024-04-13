"""Tests for the TagService class."""

# PyTest
import pytest
from ...services.tag import TagService
from .fixtures import tag_svc
from .tag_test_data import tag1, tag2, tag3
from . import tag_test_data


def test_get_all(tag_svc: TagService):
    """Test that all tags can be retrieved."""
    tags = tag_svc.all()
    assert len(tags) == 3