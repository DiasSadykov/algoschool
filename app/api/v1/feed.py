from fastapi import APIRouter, Depends
from app.deps.auth import auth

router = APIRouter()

@router.get("/")
async def read_root(user = Depends(auth)):
    return {"Hello": user}
