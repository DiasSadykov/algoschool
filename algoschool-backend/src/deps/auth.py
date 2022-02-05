import json
import os
import firebase_admin
from typing import Optional

from fastapi import Header
from firebase_admin import auth as firebase_auth

FIREBASE_SECRET = os.environ['FIREBASE_SECRET']

cred = firebase_admin.credentials.Certificate(json.loads(FIREBASE_SECRET))
firebase_app = firebase_admin.initialize_app(cred)


async def auth(authorization: Optional[str] = Header(None)):
    if authorization:
        return firebase_auth.verify_id_token(authorization)
    return None
