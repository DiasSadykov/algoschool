from fastapi import APIRouter
from . import course, submission

router = APIRouter(prefix="/v1")

router.include_router(course.router)
router.include_router(submission.router)
