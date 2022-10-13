from fastapi import APIRouter
from . import v1, v2

router = APIRouter(prefix="/api")

router.include_router(v1.router)
router.include_router(v2.router)
