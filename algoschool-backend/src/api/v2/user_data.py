from typing import Optional
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from src.const import ADMIN_USERS
from src.deps.auth import auth

router = APIRouter()


class UserInfo(BaseModel):
    is_admin: bool

@router.post("/user_info", response_model=Optional[UserInfo])
async def handler(user=Depends(auth)):
    if not user:
        return None
    return user