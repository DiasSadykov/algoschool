import uuid

from pydantic import BaseModel
from pydantic.fields import Field


def to_camel(string: str) -> str:
    string_split = string.split('_')
    return string_split[0]+''.join(word.capitalize() for word in string_split[1:])


class BaseApiModel(BaseModel):
    class Config:
        alias_generator = to_camel
        allow_population_by_field_name = True

class MongoBase(BaseApiModel):
    id: str | None = Field(default_factory=uuid.uuid4, alias="_id")
