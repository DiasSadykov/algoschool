from fastapi import APIRouter, Depends
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from slugify import slugify

from src.deps.auth import auth
from src.deps.db import db
from src.models.models import MongoBase

router = APIRouter()


class Problem(MongoBase):
    item_type: str | None
    item_title: str
    item_slug: str | None
    description: str | None
    code_snippet: str | None

class AddProblemRequest(BaseModel):
    course_block_id: str
    problem: Problem


@router.post("/add_problem")
async def handler(request: AddProblemRequest, user=Depends(auth), db=Depends(db)):
    problem = request.problem
    course_block_id = request.course_block_id
    problem.item_type = "problem"
    problem.item_slug = slugify(problem.item_title)
    doc = await db.courseblock_items.insert_one(jsonable_encoder(problem))
    await db.courses.find_one_and_update(
        {"course_title": "Algorithms"},
        {"$push": {"course_blocks.$[block].block_items": str(problem.id)}},
        array_filters=[{"block._id": course_block_id}],
    )
    return {"_id": doc.inserted_id}