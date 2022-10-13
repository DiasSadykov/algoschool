from fastapi import APIRouter
from . import course, admin, user_data

router = APIRouter(prefix="/v2")

router.include_router(course.router)
router.include_router(admin.router)
router.include_router(user_data.router)
