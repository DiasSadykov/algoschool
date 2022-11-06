from fastapi import APIRouter, Depends

from src.deps.auth import auth
from src.deps.db import db
from src.models.models import MongoBase

router = APIRouter()


class Courseblock_items(MongoBase):
    item_ids: list[str]
    is_visible: bool | None


@router.post("/change_course_block")
async def handler(
    course_block_items: Courseblock_items, user=Depends(auth), db=Depends(db)
):
    doc = await db.courses.find_one_and_update(
        {"course_title": "Algorithms"},
        {"$set": {"course_blocks.$[block].block_items": course_block_items.item_ids, "course_blocks.$[block].is_visible": course_block_items.is_visible}},
        array_filters=[{"block._id": course_block_items.id}],
    )
    return course_block_items.id
