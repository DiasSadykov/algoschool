import json
import os
import firebase_admin
from typing import Optional

from fastapi import Header
from firebase_admin import auth as firebase_auth
from pydantic import BaseModel

from src.const import ADMIN_USERS

FIREBASE_SECRET = os.environ["FIREBASE_SECRET"]

cred = firebase_admin.credentials.Certificate(json.loads(FIREBASE_SECRET))
firebase_app = firebase_admin.initialize_app(cred)

class UserInfo(BaseModel):
    uid: str
    is_admin: bool

async def auth(authorization: Optional[str] = Header(None)) -> Optional[UserInfo]:
    if authorization:
        user: dict = firebase_auth.verify_id_token(authorization)
        uid: str = user.get("uid")
        return UserInfo(uid = uid, is_admin = uid in ADMIN_USERS)
    return None
