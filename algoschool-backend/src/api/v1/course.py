import json
import urllib.request

from fastapi import APIRouter, Depends

from src.deps.auth import auth

router = APIRouter()

COURSE_URL = (
    "https://raw.githubusercontent.com/DiasSadykov/algoschool-content/main/course.json"
)
COURSE_JSON = json.loads(urllib.request.urlopen(COURSE_URL).read().decode("utf-8"))


@router.get("/course")
async def handler(user=Depends(auth)):
    return COURSE_JSON
