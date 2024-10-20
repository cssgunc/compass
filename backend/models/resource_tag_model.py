from pydantic import BaseModel


class ResourceTag(BaseModel):
    id: int | None = None
    tag_id: int
    resource_id: int
