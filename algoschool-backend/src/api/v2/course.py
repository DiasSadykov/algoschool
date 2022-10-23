from fastapi import APIRouter, Depends

from src.deps.auth import auth
from src.deps.db import db
from src.models.models import MongoBase

router = APIRouter()

class Article(MongoBase):
    item_type: str
    item_title: str
    item_slug: str | None
    reading_time: str | None
    content: str | None
    is_visible: bool | None


class Problem(MongoBase):
    item_type: str
    item_title: str
    item_slug: str | None
    description: str | None
    code_snippet: str | None
    is_visible: bool | None


class CourseBlock(MongoBase):
    block_title: str | None
    block_items: list


class Course(MongoBase):
    course_title: str | None
    course_blocks: list[CourseBlock]


@router.get("/course", response_model=Course)
async def handler(user=Depends(auth), db=Depends(db)):
    course = Course.parse_obj(await db.courses.find_one({"courseTitle": "Algorithms"}))
    for index, course_block in enumerate(course.course_blocks):
        course_block_items = []
        for block_item_id in course_block.block_items:
            course_block_items.append(
                await db.courseblockitems.find_one({"_id": block_item_id})
            )
        course.course_blocks[index].block_items = [item for item in course_block_items if item.get("isVisible", False) or (user and user.is_admin)]
    return course
