from bson.objectid import ObjectId

from fastapi import APIRouter, Depends

from src.deps.auth import auth
from src.deps.db import db
from src.models.models import MongoBase

router = APIRouter()


class CourseBlockItemId(MongoBase):
    pass

class CourseBlockId(MongoBase):
    pass


@router.post("/delete_course_block_item")
async def handler(
    course_block_id: CourseBlockId, course_block_item_id: CourseBlockItemId, user=Depends(auth), db=Depends(db)
):
    await db.courses.find_one_and_update(
        {"course_title": "Algorithms"},
        {"$pull": {"course_blocks.$[block].block_items": str(course_block_item_id.id)}},
        array_filters=[{"block._id": course_block_id.id}],
    )
    doc = await db.courseblock_items.delete_one({"_id": course_block_item_id.id})
    return {"_id": course_block_item_id.id}
