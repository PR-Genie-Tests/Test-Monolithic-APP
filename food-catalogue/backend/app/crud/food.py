from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.food import Food
from app.schemas.food import FoodCreate, FoodUpdate

class CRUDFood(CRUDBase[Food, FoodCreate, FoodUpdate]):
    def get_by_name(self, db: Session, *, name: str):
        return db.query(Food).filter(Food.name == name).first()

    def get_foods_by_category(self, db: Session, *, category_id: int, skip: int = 0, limit: int = 100):
        return db.query(Food).filter(Food.category_id == category_id).offset(skip).limit(limit).all()

food = CRUDFood(Food)

# Bug: No check for duplicate food name on creation within the same category
# Bug: get_foods_by_category doesn't validate if category_id exists
# Bug: No error handling if food not found for update/delete
