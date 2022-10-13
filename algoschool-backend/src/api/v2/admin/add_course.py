from fastapi import APIRouter, Depends
from fastapi.encoders import jsonable_encoder

from src.deps.auth import auth
from src.deps.db import db
from src.models.models import MongoBase

router = APIRouter()


class Course(MongoBase):
    course_title: str
    course_blocks: list | None = []


@router.post("/add_course")
async def handler(course: Course, user=Depends(auth), db=Depends(db)):
    doc = await db.courses.insert_one(jsonable_encoder(course))
    return {"_id": doc.inserted_id}
