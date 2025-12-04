from typing import Optional, List

from pydantic import BaseModel

class CategoryBase(BaseModel):
    name: str
    description: Optional[str] = None

class CategoryCreate(CategoryBase):
    pass

class CategoryUpdate(CategoryBase):
    pass

class CategoryInDBBase(CategoryBase):
    id: Optional[int] = None

    class Config:
        from_attributes = True

class Category(CategoryInDBBase):
    pass

# Bug: Category name has no length validation
# Bug: Category description has no length validation
