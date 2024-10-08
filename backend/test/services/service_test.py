from backend.models.user_model import User
from backend.entities.service_entity import ServiceEntity
from ...models.enum_for_models import ProgramTypeEnum
from backend.services.service import ServiceService
from backend.services.exceptions import ServiceNotFoundException
from . import service_test_data
from . import user_test_data
from .fixtures import service_svc, user_svc
from backend.models.service_model import Service
import pytest


def test_list(service_svc: ServiceService):
    service = service_svc.get_all(user_test_data.admin)
    assert len(service) == len(service_test_data.services)
    assert isinstance(service[0], Service)


def test_get_by_name(service_svc: ServiceService):
    service = service_svc.get_service_by_name("service 1")
    assert service.name == service_test_data.service1.name
    assert isinstance(service, Service)


def test_get_by_name_not_found(service_svc: ServiceService):
    with pytest.raises(ServiceNotFoundException):
        service = service_svc.get_service_by_name("service 12")
        pytest.fail()


def test_get_service_by_user_admin(service_svc: ServiceService):
    service = service_svc.get_service_by_user(user_test_data.admin)
    assert len(service) == len(service_test_data.services)


def test_get_service_by_user_volun(service_svc: ServiceService):
    service = service_svc.get_service_by_user(user_test_data.volunteer)
    assert len(service) == 4


def test_get_by_program(service_svc: ServiceService):
    services = service_svc.get_service_by_program(ProgramTypeEnum.COMMUNITY)
    for service in services:
        assert service.program == ProgramTypeEnum.COMMUNITY
        assert isinstance(service, Service)


def test_create(service_svc: ServiceService):
    service = service_svc.create(user_test_data.admin, service_test_data.service7)
    assert service.name == service_test_data.service7.name
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
    service_svc.delete(user_test_data.admin, service_test_data.service_6)
    services = service_svc.get_all(user_test_data.admin)
    assert len(services) == len(service_test_data.services) - 1


"""def test_delete_not_found(service_svc: ServiceService):
    with pytest.raises(ServiceNotFoundException):
        service_svc.delete(user_test_data.admin, service_test_data.service_10)
        pytest.fail()"""
