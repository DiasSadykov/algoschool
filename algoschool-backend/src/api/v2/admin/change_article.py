from fastapi import APIRouter, Depends
from fastapi.encoders import jsonable_encoder
from slugify import slugify

from src.deps.auth import auth
from src.deps.db import db
from src.models.models import MongoBase, BaseApiModel

router = APIRouter()

class Article(MongoBase):
    item_type: str | None
    item_title: str
    item_slug: str | None
    reading_time: str | None
    content: str | None


class ChangeArticleRequest(BaseApiModel):
    course_block_item_id: str
    article: Article


@router.post("/change_article")
async def handler(request: ChangeArticleRequest, user=Depends(auth), db=Depends(db)):
    article = request.article
    course_block_item_id = request.course_block_item_id
    article.item_type = "article"
    article.item_slug = slugify(article.item_title)
    doc = db.courseblockitems.update_one({'_id': course_block_item_id}, {"$set": {
        "itemTitle": article.item_title,
        "itemSlug": article.item_slug,
        "readingTime": article.reading_time,
        "content": article.content
    }}, upsert=False)
    return {"_id": article.id}
