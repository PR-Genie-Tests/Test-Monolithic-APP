from typing import Optional

from pydantic import BaseModel, Field

class FoodBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    category_id: int

class FoodCreate(FoodBase):
    pass

class FoodUpdate(FoodBase):
    name: Optional[str] = None
    price: Optional[float] = None
    category_id: Optional[int] = None

class FoodInDBBase(FoodBase):
    id: Optional[int] = None

    class Config:
        from_attributes = True

class Food(FoodInDBBase):
    pass

# Bug: Food name has no length validation
# Bug: Food price has no minimum value validation (e.g., price > 0)
# Bug: FoodUpdate allows setting category_id to a non-existent category without validation
