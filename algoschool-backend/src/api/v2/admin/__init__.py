from fastapi import APIRouter
from . import (
    add_course,
    add_course_block,
    delete_course_block,
    change_course_block,
    add_article,
    add_problem,
    delete_course_block_item,
    change_article,
    change_problem
)

router = APIRouter(prefix="/admin")

router.include_router(add_course.router)
router.include_router(add_course_block.router)
router.include_router(add_article.router)
router.include_router(add_problem.router)
router.include_router(change_course_block.router)
router.include_router(change_problem.router)
router.include_router(change_article.router)
router.include_router(delete_course_block.router)
router.include_router(delete_course_block_item.router)
