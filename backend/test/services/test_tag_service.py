import pytest
from sqlalchemy.orm import Session
from ...services.tag import TagService
from .fixtures import tag_svc
from .tag_test_data import tag1, tag2, tag3

# Test to get a tag by ID
def test_get_tag_by_id(tag_svc: TagService):
    """Test getting a tag by ID."""
    # Retrieve a tag by its ID
    tag = tag_svc.get_tag_by_id(tag1.id)

    # Ensure the retrieved tag matches the expected tag1 data
    assert tag.id == tag1.id
    assert tag.content == tag1.content

# Test to delete a tag
def test_delete_tag(tag_svc: TagService):
    """Test deleting a tag."""
    # Attempt to delete an existing tag
    assert tag_svc.delete_tag(tag2.id)

    # Ensure the tag has been deleted by attempting to delete a non-existing tag
    assert not tag_svc.delete_tag(1000)

# Test to update a tag
def test_update_tag(tag_svc: TagService):
    """Test updating a tag."""
    # Update the content of a tag
    updated_content = "Updated Content"
    updated_tag = tag_svc.update_tag(tag3.id, updated_content)

    # Ensure the content of the updated tag matches the expected updated content
    assert updated_tag.content == updated_content
