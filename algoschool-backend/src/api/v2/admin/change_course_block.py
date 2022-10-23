from fastapi import APIRouter, Depends

from src.deps.auth import auth
from src.deps.db import db
from src.models.models import MongoBase

router = APIRouter()


class CourseBlockItems(MongoBase):
    item_ids: list[str]
    is_visible: bool | None


@router.post("/change_course_block")
async def handler(
    course_block_items: CourseBlockItems, user=Depends(auth), db=Depends(db)
):
    doc = await db.courses.find_one_and_update(
        {"courseTitle": "Algorithms"},
        {"$set": {"courseBlocks.$[block].blockItems": course_block_items.item_ids, "courseBlocks.$[block].is_visible": course_block_items.is_visible}},
        array_filters=[{"block._id": course_block_items.id}],
    )
    return course_block_items.id
