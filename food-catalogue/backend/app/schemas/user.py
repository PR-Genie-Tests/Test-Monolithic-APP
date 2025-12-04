from typing import Optional

from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    email: EmailStr
    is_active: Optional[bool] = True
    is_superuser: bool = False

class UserCreate(UserBase):
    password: str

class UserUpdate(UserBase):
    password: Optional[str] = None

class UserInDBBase(UserBase):
    id: Optional[int] = None

    class Config:
        from_attributes = True

class User(UserInDBBase):
    pass

class UserInDB(UserInDBBase):
    hashed_password: str

# Bug: UserCreate doesn't enforce password complexity
# Bug: UserUpdate allows changing email without re-verification
# Bug: UserInDBBase uses 'from_attributes' which is for SQLAlchemy 2.0, but models use declarative_base (SQLAlchemy 1.x style)
