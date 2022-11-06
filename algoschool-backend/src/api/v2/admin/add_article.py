from fastapi import APIRouter, Depends
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from slugify import slugify

from src.deps.auth import auth
from src.deps.db import db
from src.models.models import MongoBase

router = APIRouter()

class Article(MongoBase):
    item_type: str | None
    item_title: str
    item_slug: str | None
    reading_time: str | None
    content: str | None


class AddArticleRequest(BaseModel):
    course_block_id: str
    article: Article


@router.post("/add_article")
async def handler(request: AddArticleRequest, user=Depends(auth), db=Depends(db)):
    article = request.article
    course_block_id = request.course_block_id
    article.item_type = "article"
    article.item_slug = slugify(article.item_title)
    doc = await db.courseblock_items.insert_one(jsonable_encoder(article))
    await db.courses.find_one_and_update(
        {"course_title": "Algorithms"},
        {"$push": {"course_blocks.$[block].block_items": str(article.id)}},
        array_filters=[{"block._id": course_block_id}],
    )
    return {"_id": doc.inserted_id}
