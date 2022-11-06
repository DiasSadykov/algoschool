from fastapi import APIRouter, Depends
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
    is_visible: bool | None

class ChangeProblemRequest(BaseModel):
    course_block_item_id: str
    problem: Problem


@router.post("/change_problem")
async def handler(request: ChangeProblemRequest, user=Depends(auth), db=Depends(db)):
    problem = request.problem
    course_block_item_id = request.course_block_item_id
    problem.item_type = "problem"
    problem.item_slug = slugify(problem.item_title)
    doc = db.courseblock_items.update_one({'_id': course_block_item_id}, {"$set": {
        "item_title": problem.item_title,
        "item_slug": problem.item_slug,
        "description": problem.description,
        "code_snippet": problem.code_snippet,
        "is_visible": problem.is_visible
    }}, upsert=False)
    return {"_id": problem.id}