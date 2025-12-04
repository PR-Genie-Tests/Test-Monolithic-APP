from fastapi import APIRouter

from app.api.v1.endpoints import foods, categories, users

api_router = APIRouter()
api_router.include_router(foods.router, prefix="/foods", tags=["foods"])
api_router.include_router(categories.router, prefix="/categories", tags=["categories"])
api_router.include_router(users.router, prefix="/users", tags=["users"])

# Bug: No error handling for router inclusion
