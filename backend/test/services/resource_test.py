import pytest
from sqlalchemy.orm import Session
from sqlalchemy.exc import NoResultFound
from .resource_service import ResourceService
from .models.resource_model import Resource
from .entities.resource_entity import ResourceEntity
from .models.user_model import User
from .exceptions import ResourceNotFoundException

# Example of a Resource and User object creation for use in tests
@pytest.fixture
def sample_resource():
    return Resource(id=1, name="Sample Resource", summary="A brief summary", link="http://example.com", programtype="TypeA")

@pytest.fixture
def sample_user():
    return User(id=1, username="admin", is_admin=True)

@pytest.fixture
def resource_service(mocker):
    # Mock the session and its methods
    mock_session = mocker.MagicMock(spec=Session)
    return ResourceService(session=mock_session)

def test_all(resource_service, mocker):
    # Setup
    mock_query_all = mocker.MagicMock(return_value=[ResourceEntity(id=1, name="Resource One"), ResourceEntity(id=2, name="Resource Two")])
    mocker.patch.object(resource_service._session, 'scalars', return_value=mock_query_all)
    
    # Execution
    results = resource_service.all()
    
    # Verification
    assert len(results) == 2
    assert results[0].id == 1
    assert results[1].name == "Resource Two"

def test_create(resource_service, mocker, sample_resource, sample_user):
    # Mock the add and commit methods of session
    mocker.patch.object(resource_service._session, 'add')
    mocker.patch.object(resource_service._session, 'commit')
    
    # Execution
    result = resource_service.create(sample_user, sample_resource)
    
    # Verification
    resource_service._session.add.assert_called_once()
    resource_service._session.commit.assert_called_once()
    assert result.id == sample_resource.id
    assert result.name == sample_resource.name

def test_get_by_id_found(resource_service, mocker):
    # Setup
    resource_entity = ResourceEntity(id=1, name="Existing Resource")
    mocker.patch.object(resource_service._session, 'query', return_value=mocker.MagicMock(one_or_none=mocker.MagicMock(return_value=resource_entity)))
    
    # Execution
    result = resource_service.get_by_id(1)
    
    # Verification
    assert result.id == 1
    assert result.name == "Existing Resource"

def test_get_by_id_not_found(resource_service, mocker):
    # Setup
    mocker.patch.object(resource_service._session, 'query', return_value=mocker.MagicMock(one_or_none=mocker.MagicMock(return_value=None)))
    
    # Execution & Verification
    with pytest.raises(ResourceNotFoundException):
        resource_service.get_by_id(999)

def test_update(resource_service, mocker, sample_resource, sample_user):
    # Setup
    mocker.patch.object(resource_service._session, 'get', return_value=sample_resource)
    mocker.patch.object(resource_service._session, 'commit')
    
    # Execution
    result = resource_service.update(sample_user, sample_resource)
    
    # Verification
    assert result.id == sample_resource.id
    resource_service._session.commit.assert_called_once()

def test_delete(resource_service, mocker):
    # Setup
    mock_resource = ResourceEntity(id=1, name="Delete Me")
    mocker.patch.object(resource_service._session, 'query', return_value=mocker.MagicMock(one_or_none=mocker.MagicMock(return_value=mock_resource)))
    mocker.patch.object(resource_service._session, 'delete')
    mocker.patch.object(resource_service._session, 'commit')
    
    # Execution
    resource_service.delete(sample_user(), 1)
    
    # Verification
    resource_service._session.delete.assert_called_with(mock_resource)
    resource_service._session.commit.assert_called_once()

def test_get_by_slug(resource_service, mocker):
    # Setup
    mock_query_all = mocker.MagicMock(return_value=[ResourceEntity(id=1, name="Resource One"), ResourceEntity(id=2, name="Resource Two")])
    mocker.patch.object(resource_service._session, 'scalars', return_value=mock_query_all)
    
    # Execution
    results = resource_service.get_by_slug("Resource")
    
    # Verification
   
