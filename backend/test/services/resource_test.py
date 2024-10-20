from backend.models.user_model import User
from backend.entities.resource_entity import ResourceEntity
from ...models.enum_for_models import ProgramTypeEnum
from backend.services.resource import ResourceService
from backend.services.exceptions import ServiceNotFoundException
from . import resource_test_data
from . import user_test_data
from .fixtures import resource_svc, user_svc
from backend.models.resource_model import Resource
import pytest

# Volunteer test data is COMMUNITY, ECONOMIC

def test_get_resource_by_user_volunteer(resource_svc: ResourceService): 
    resources = resource_svc.get_resource_by_user(user_test_data.volunteer)
    assert len(resources) == 2
    assert isinstance(resources[0], Resource)

def test_get_resources_admin(resource_svc: ResourceService):
    resources = resource_svc.get_resource_by_user(user_test_data.admin)
    assert len(resources) == len(resource_test_data.resources)
    assert isinstance(resources[0], Resource)

def test_create_resource_admin(resource_svc: ResourceService):
    resource = resource_svc.create(user_test_data.admin, resource_test_data.resource6)
    assert resource.name == resource_test_data.resource6.name
    assert isinstance(resource, Resource)

def test_create_not_permitted(resource_svc: ResourceService):
    with pytest.raises(PermissionError):
        resource = resource_svc.create(user_test_data.volunteer, resource_test_data.resource1)
        pytest.fail()
    
    


