from fastapi import APIRouter, Depends
from fastapi.encoders import jsonable_encoder

from src.deps.auth import auth
from src.deps.db import db
from src.models.models import MongoBase

router = APIRouter()


class CourseBlock(MongoBase):
    block_title: str
    block_items: list | None = []


@router.post("/add_course_block")
async def handler(course_block: CourseBlock, user=Depends(auth), db=Depends(db)):
    doc = await db.courses.find_one_and_update(
        {"courseTitle": "Algorithms"},
        {"$push": {"courseBlocks": jsonable_encoder(course_block)}},
    )
    return {"_id": doc.get("_id")}
