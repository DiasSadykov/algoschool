import uuid

from pydantic import BaseModel
from pydantic.fields import Field


class MongoBase(BaseModel):
    id: str | None = Field(default_factory=uuid.uuid4, alias="_id")
