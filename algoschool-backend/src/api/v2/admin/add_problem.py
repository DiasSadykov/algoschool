from fastapi import APIRouter, Depends
from fastapi.encoders import jsonable_encoder
from slugify import slugify

from src.deps.auth import auth
from src.deps.db import db
from src.models.models import BaseApiModel, MongoBase

router = APIRouter()


class Problem(MongoBase):
    item_type: str | None
    item_title: str
    item_slug: str | None
    description: str | None
    code_snippet: str | None

class AddProblemRequest(BaseApiModel):
    course_block_id: str
    problem: Problem


@router.post("/add_problem")
async def handler(request: AddProblemRequest, user=Depends(auth), db=Depends(db)):
    problem = request.problem
    course_block_id = request.course_block_id
    problem.item_type = "problem"
    problem.item_slug = slugify(problem.item_title)
    doc = await db.courseblockitems.insert_one(jsonable_encoder(problem))
    await db.courses.find_one_and_update(
        {"courseTitle": "Algorithms"},
        {"$push": {"courseBlocks.$[block].blockItems": str(problem.id)}},
        array_filters=[{"block._id": course_block_id}],
    )
    return {"_id": doc.inserted_id}