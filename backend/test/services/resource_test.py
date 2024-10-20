from backend.services import ResourceService, TagService
from .user_test_data import admin
from .fixtures import resource_svc, tag_svc


def test_temp(resource_svc: ResourceService, tag_svc: TagService):
    resources = resource_svc.get_resource_by_user(admin)
    tags = tag_svc.all()
    print(tags)
    print(resources)
