import os
from typing import Optional

from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    PROJECT_NAME: str = "Food Catalogue API"
    API_V1_STR: str = "/api/v1"

    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://user:password@db:5432/food_db")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "super-secret-key-that-is-not-secure") # Bug: Default secret key is insecure
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30 # Bug: Short expiration time might be annoying for users

    # Bug: Missing validation for environment variables
    # Bug: No distinction between development and production settings

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
