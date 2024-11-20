from backend.models.enum_for_models import ProgramTypeEnum
from backend.models.resource_model import Resource
from backend.models.tag_model import Tag
from backend.services import ResourceService, TagService
from backend.services.exceptions import ResourceNotFoundException
from .user_test_data import admin
from .fixtures import resource_svc
from backend.test.services import user_test_data, resource_test_data, tag_test_data
import pytest


def test_temp(resource_svc: ResourceService, tag_svc: TagService):
    resources = resource_svc.get_resource_by_user(admin)
    tags = tag_svc.all()
    print(tags)
    print(resources)


def test_list(resource_svc: ResourceService):
    resource = resource_svc.get_resource_by_user(user_test_data.admin)
    assert len(resource) == len(resource_test_data.resources)
    assert isinstance(resource[0], Resource)


def test_get_by_name(resource_svc: ResourceService):
    resource = resource_svc.get_by_slug(user_test_data.admin, "resource 1")
    assert resource[0].name == resource_test_data.resource1.name
    assert isinstance(resource[0], Resource)


def test_get_by_name_not_found(resource_svc: ResourceService):
    resource = resource_svc.get_by_slug(user_test_data.admin, "resource 12")
    assert len(resource) == 0


def test_get_resource_by_user_admin(resource_svc: ResourceService):
    resource = resource_svc.get_resource_by_user(user_test_data.admin)
    assert len(resource) == len(resource_test_data.resources)


def test_get_resource_by_user_volun(resource_svc: ResourceService):
    resource = resource_svc.get_resource_by_user(user_test_data.volunteer)
    assert len(resource) == 2


def test_get_by_program(resource_svc: ResourceService):
    resources = resource_svc.get_by_program(
        user_test_data.admin, ProgramTypeEnum.COMMUNITY
    )
    for resource in resources:
        assert resource.program == ProgramTypeEnum.COMMUNITY
        assert isinstance(resource, Resource)


def test_create(resource_svc: ResourceService):
    resource = resource_svc.create(
        user_test_data.admin, resource_test_data.resource_to_create
    )
    assert resource.name == resource_test_data.resource_to_create.name
    assert isinstance(resource, Resource)


def test_update(resource_svc: ResourceService):
    resource = resource_svc.update(
        user_test_data.admin, resource_test_data.resource4_edit
    )
    assert resource.name == resource_test_data.resource4_edit.name
    assert isinstance(resource, Resource)


def test_update_with_tags(resource_svc: ResourceService):
    resource = resource_svc.update(user_test_data.admin, resource_test_data.resource2)
    assert len(resource.tags) == 2


def test_update_not_found(resource_svc: ResourceService):
    with pytest.raises(ResourceNotFoundException):
        resource = resource_svc.update(
            user_test_data.admin, resource_test_data.resource_to_create
        )
        pytest.fail()


def test_delete(resource_svc: ResourceService):
    resource_svc.delete(user_test_data.admin, resource_test_data.resource3)
    resources = resource_svc.get_resource_by_user(user_test_data.admin)
    assert len(resources) == len(resource_test_data.resources) - 1


def test_delete_not_found(resource_svc: ResourceService):
    with pytest.raises(ResourceNotFoundException):
        resource_svc.delete(user_test_data.admin, resource_test_data.resource_10)
        pytest.fail()


def test_create_resource_with_tags(resource_svc: ResourceService):
    resource = Resource(
        name="test resource",
        summary="summary",
        link="www.example.com",
        program=ProgramTypeEnum.COMMUNITY,
        tags=[Tag(content="resource tag")],
    )
    resource_entity = resource_svc.create(user_test_data.admin, resource)
    assert len(resource_entity.tags) == 1


def test_update_tags_for_resource(resource_svc: ResourceService):
    resourceEntity = resource_svc.update(
        user_test_data.admin, resource_test_data.resource2_edit_tags
    )
    assert len(resourceEntity.tags) == 1
