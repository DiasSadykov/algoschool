from fastapi import APIRouter, Depends
from src.deps.auth import auth
from src.deps.db import db
from src.models.models import MongoBase

router = APIRouter()


class CourseBlockId(MongoBase):
    pass


@router.post("/delete_course_block")
async def handler(course_block_id: CourseBlockId, user=Depends(auth), db=Depends(db)):
    doc = await db.courses.update_one(
        {"courseTitle": "Algorithms"},
        {"$pull": {"courseBlocks": {"_id": course_block_id.id}}},
    )
    return {"id": course_block_id.id}
