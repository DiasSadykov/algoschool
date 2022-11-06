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
    is_visible: bool | None

class ChangeArticleRequest(BaseModel):
    course_block_item_id: str
    article: Article


@router.post("/change_article")
async def handler(request: ChangeArticleRequest, user=Depends(auth), db=Depends(db)):
    article = request.article
    course_block_item_id = request.course_block_item_id
    article.item_type = "article"
    article.item_slug = slugify(article.item_title)
    doc = db.courseblock_items.update_one({'_id': course_block_item_id}, {"$set": {
        "item_title": article.item_title,
        "item_slug": article.item_slug,
        "reading_time": article.reading_time,
        "content": article.content,
        "is_visible": article.is_visible
    }}, upsert=False)
    return {"_id": article.id}
