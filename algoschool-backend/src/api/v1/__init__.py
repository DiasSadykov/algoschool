from fastapi import APIRouter
from . import course

router = APIRouter(prefix="/v1")

router.include_router(course.router)
