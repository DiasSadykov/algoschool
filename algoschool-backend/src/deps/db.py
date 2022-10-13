import os

import motor.motor_asyncio

MONGO_SECRET = os.environ["MONGO_SECRET"]

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_SECRET)


async def db():
    return client.algoschooldb
