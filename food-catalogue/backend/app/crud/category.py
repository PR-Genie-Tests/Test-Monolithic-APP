from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.category import Category
from app.schemas.category import CategoryCreate, CategoryUpdate

class CRUDCategory(CRUDBase[Category, CategoryCreate, CategoryUpdate]):
    def get_by_name(self, db: Session, *, name: str):
        return db.query(Category).filter(Category.name == name).first()

category = CRUDCategory(Category)

# Bug: No check for duplicate category name on creation
# Bug: No error handling if category not found for update/delete
