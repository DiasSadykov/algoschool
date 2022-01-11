from fastapi import APIRouter
from . import feed

router = APIRouter(prefix="/v1")

router.include_router(feed.router)