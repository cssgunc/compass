"""Tests for the TagService class."""

# PyTest
import pytest
from ...services import TagService, ResourceService, ServiceService
from .fixtures import tag_svc, resource_svc, service_svc
from .tag_test_data import tag_to_create, tag_to_create_no_id, tags
from .user_test_data import admin


def test_get_all(tag_svc: TagService):
    """Test that all tags can be retrieved."""
    all_tags = tag_svc.all()
    assert len(all_tags) == len(tags)


def test_create_tag(tag_svc: TagService):
    """Test creation of tag"""
    created_tag = tag_svc.create(admin, tag_to_create)

    assert created_tag.content == tag_to_create.content
    assert len(tag_svc.all()) == len(tags) + 1


def test_create_tag_no_id(tag_svc: TagService):
    """Test creation of tag"""
    created_tag = tag_svc.create(admin, tag_to_create_no_id)
    queried_tag = tag_svc.get_tag_by_id(4)

    assert created_tag.content == tag_to_create_no_id.content
    assert len(tag_svc.all()) == len(tags) + 1
    assert queried_tag.content == created_tag.content


def test_resource_tag_creation(tag_svc: TagService, resource_svc: ResourceService):
    """Test creation and attachment of resource tag"""

    resource = resource_svc.get_resource_by_user(admin)[0]
    tag_svc.add_tag_resource(admin, tags[0], resource)
    updated_resource = resource_svc.get_by_id(admin, resource.id)

    assert len(resource.tags) == 0
    assert len(updated_resource.tags) == 1
    assert resource.id == updated_resource.id


def test_service_tag_creation(tag_svc: TagService, service_svc: ServiceService):
    """Test creation and attachment of service tag"""

    service = service_svc.get_service_by_user(admin)[0]
    tag_svc.add_tag_service(admin, tags[0], service)
    updated_service = service_svc.get_service_by_id(service.id)

    assert len(service.tags) == 0
    assert len(updated_service.tags) == 1
    assert service.id == updated_service.id
