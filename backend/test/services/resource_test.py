from backend.models.user_model import User
from backend.entities.resource_entity import ResourceEntity
from ...models.enum_for_models import ProgramTypeEnum
from backend.services.resource import ResourceService
from backend.services.tag import TagService
from backend.services.exceptions import ResourceNotFoundException
from . import resource_test_data
from . import user_test_data
from .fixtures import resource_svc, user_svc, tag_svc
from backend.models.resource_model import Resource
import pytest


def test_get_resource_by_user_volunteer(resource_svc: ResourceService): 
    """ Test getting resources by a volunteer """
    resources = resource_svc.get_resource_by_user(user_test_data.volunteer)
    assert len(resources) == 2
    assert isinstance(resources[0], Resource)

def test_get_resources_admin(resource_svc: ResourceService):
    """ Test getting resources by an admin """
    resources = resource_svc.get_resource_by_user(user_test_data.admin)
    assert len(resources) == len(resource_test_data.resources)
    assert isinstance(resources[0], Resource)

def test_get_resources_employee(resource_svc: ResourceService):
    """ Test getting by an employee """
    resources = resource_svc.get_resource_by_user(user_test_data.employee)
    assert len(resources) == 5
    assert isinstance(resources[0], Resource)

def test_create_resource_admin(resource_svc: ResourceService):
    """ Test creating resources as an admin """
    resource = resource_svc.create(user_test_data.admin, resource_test_data.resource6)
    assert resource.name == resource_test_data.resource6.name
    assert isinstance(resource, Resource)

def test_create_not_permitted(resource_svc: ResourceService):
    """ Test creating resources without permission """
    with pytest.raises(PermissionError):
        resource = resource_svc.create(user_test_data.volunteer, resource_test_data.resource1)
        pytest.fail()

def test_get_by_id(resource_svc: ResourceService):
    """ Test getting a resource by id as an admin """
    test_resource = resource_test_data.resource1
    resource = resource_svc.get_by_id(user_test_data.admin, test_resource.id)
    assert resource is not None
    assert resource.id == test_resource.id
    assert resource.name == test_resource.name

def test_get_by_id_no_access(resource_svc: ResourceService):
    """ Test getting a resourced with an id no accessible to an employee """
    test_resource = resource_test_data.resource2
    with pytest.raises(ResourceNotFoundException):
        resource = resource_svc.get_by_id(user_test_data.employee, test_resource.id)
        pytest.fail()

def test_update(resource_svc: ResourceService):
    """ Test updating a resource by an admin """
    updated_resource = resource_test_data.resource5_new
    resource = resource_svc.update(user_test_data.admin, updated_resource)
    assert resource.id == updated_resource.id
    assert resource.name == updated_resource.name
    assert resource.summary == updated_resource.summary
    assert resource.link == updated_resource.link
    assert resource.program == updated_resource.program

def test_update_no_permission(resource_svc: ResourceService):
    """ Test updating a resource without permission """
    with pytest.raises(PermissionError):
        resource = resource_svc.update(user_test_data.employee, resource_test_data.resource5_new)
        pytest.fail()

def test_delete(resource_svc: ResourceService):
    """ Test deleting a resource as an admin """
    resource_svc.delete(user_test_data.admin, resource_test_data.resource5.id)
    resources = resource_svc.get_resource_by_user(user_test_data.admin)
    assert len(resources) == len(resource_test_data.resources) - 1

def test_delete_no_permission(resource_svc: ResourceService):
    """ Test deleting a resource with no permission """
    with pytest.raises(PermissionError):
        resource = resource_svc.delete(user_test_data.employee, resource_test_data.resource5.id)
        pytest.fail()

def test_get_1_by_slug(resource_svc: ResourceService):
    """ Test getting 1 resource with a specific search """
    resource_to_test = resource_test_data.resource1
    slug = "Resource 1"
    resources = resource_svc.get_by_slug(user_test_data.admin, slug)
    assert len(resources) == 1
    resource = resources[0]
    assert resource.id == resource_to_test.id 
    assert resource.name == resource_to_test.name 
    assert resource.summary == resource_to_test.summary 
    assert resource.link == resource_to_test.link 
    assert resource.program == resource_to_test.program

def test_get_by_slug(resource_svc: ResourceService):
    """ Test a generic search to get all resources """
    slug = "Resource"
    resources = resource_svc.get_by_slug(user_test_data.admin, slug)
    assert len(resources) == 5

def test_get_by_slug_not_found(resource_svc: ResourceService):
    """ Test getting a resource that does not exist """
    slug = "Not Found"
    with pytest.raises(ResourceNotFoundException):
        resources = resource_svc.get_by_slug(user_test_data.admin, slug)
        pytest.fail()


def test_get_by_slug_no_permission(resource_svc: ResourceService):
    """ Test getting a resource the user does not have access to """
    slug = "Resource 2"
    with pytest.raises(ResourceNotFoundException):
        resources = resource_svc.get_by_slug(user_test_data.employee, slug)
        pytest.fail()
