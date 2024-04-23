import pytest

from ...services import ServiceService
from .fixtures import service_svc
from ...models.service_model import Service
from ...models.enum_for_models import ProgramTypeEnum

from . import user_test_data
from . import service_test_data
from ...services.exceptions import ServiceNotFoundException, ProgramNotAssignedException


def test_get_all(service_svc: ServiceService):
    service = service_svc.get_all(user_test_data.admin)
    assert len(service) == len(service_test_data.services)


def test_get_by_id(service_svc: ServiceService):
    if service_test_data.service_1.id != None:
        service = service_svc.get_service_by_id(service_test_data.service_1.id)
    assert service.id == service_test_data.service_1.id


def test_get_by_name_not_found(service_svc: ServiceService):
    with pytest.raises(ServiceNotFoundException):
        service_svc.get_service_by_id(12)
        pytest.fail()


def test_get_by_program(service_svc: ServiceService):
    services = service_svc.get_service_by_program(ProgramTypeEnum.COMMUNITY)
    for service in services:
        assert service.program == ProgramTypeEnum.COMMUNITY
        assert isinstance(service, Service)


def test_create(service_svc: ServiceService):
    service = service_svc.create(user_test_data.admin, service_test_data.service_7)
    assert service.name == service_test_data.service_7.name
    assert isinstance(service, Service)


def test_update(service_svc: ServiceService):
    service = service_svc.update(user_test_data.admin, service_test_data.service_6_edit)
    assert service.status == service_test_data.service_6_edit.status
    assert service.requirements == service_test_data.service_6_edit.requirements
    assert isinstance(service, Service)


def test_update_not_found(service_svc: ServiceService):
    with pytest.raises(ServiceNotFoundException):
        service = service_svc.update(
            user_test_data.admin, service_test_data.new_service
        )
        pytest.fail()


def test_delete(service_svc: ServiceService):
    service_svc.delete(user_test_data.admin, service_test_data.service_1)
    services = service_svc.get_all(user_test_data.admin)
    assert len(services) == len(service_test_data.services) - 1


def test_delete_not_found(service_svc: ServiceService):
    with pytest.raises(ServiceNotFoundException):
        service_svc.delete(user_test_data.admin, service_test_data.service_7)
        pytest.fail()
