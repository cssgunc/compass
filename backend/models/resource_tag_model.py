from pydantic import BaseModel


class ResourceTag(BaseModel):
    id: int | None = None
    tagId: int
    resourceId: int
