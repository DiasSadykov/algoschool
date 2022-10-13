from re import sub
import httpx

from fastapi import APIRouter, Depends
from pydantic import BaseModel

from src.deps.auth import auth

router = APIRouter()

SUBMISSION_URL = "https://functions.yandexcloud.net/d4e6lnnj25d14gklbm95"


class Submission(BaseModel):
    code: str
    problem_id: str


@router.post("/submission")
async def handler(submission: Submission, user=Depends(auth)):
    async with httpx.AsyncClient() as client:
        resp = await client.post(
            SUBMISSION_URL,
            json={"code": submission.code, "problem_id": submission.problem_id},
        )
    return resp.json()
