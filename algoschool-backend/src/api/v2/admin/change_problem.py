from fastapi import APIRouter, Depends
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

class ChangeProblemRequest(BaseApiModel):
    course_block_item_id: str
    problem: Problem


@router.post("/change_problem")
async def handler(request: ChangeProblemRequest, user=Depends(auth), db=Depends(db)):
    problem = request.problem
    course_block_item_id = request.course_block_item_id
    problem.item_type = "problem"
    problem.item_slug = slugify(problem.item_title)
    doc = db.courseblockitems.update_one({'_id': course_block_item_id}, {"$set": {
        "itemTitle": problem.item_title,
        "itemSlug": problem.item_slug,
        "description": problem.description,
        "codeSnippet": problem.code_snippet
    }}, upsert=False)
    return {"_id": problem.id}