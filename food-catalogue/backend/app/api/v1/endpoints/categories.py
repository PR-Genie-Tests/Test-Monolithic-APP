from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, schemas
from app.api import deps

router = APIRouter()

@router.get("/", response_model=List[schemas.Category])
def read_categories(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve categories.
    """
    categories = crud.category.get_multi(db, skip=skip, limit=limit)
    return categories

@router.post("/", response_model=schemas.Category)
def create_category(
    *,
    db: Session = Depends(deps.get_db),
    category_in: schemas.CategoryCreate,
) -> Any:
    """
    Create new category.
    """
    category = crud.category.get_by_name(db, name=category_in.name)
    if category:
        raise HTTPException(
            status_code=400,
            detail="The category with this name already exists in the system.",
        )
    category = crud.category.create(db, obj_in=category_in)
    return category

@router.put("/{category_id}", response_model=schemas.Category)
def update_category(
    *,
    db: Session = Depends(deps.get_db),
    category_id: int,
    category_in: schemas.CategoryUpdate,
) -> Any:
    """
    Update a category.
    """
    category = crud.category.get(db, id=category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    category = crud.category.update(db, db_obj=category, obj_in=category_in)
    return category

@router.get("/{category_id}", response_model=schemas.Category)
def read_category(
    category_id: int,
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Get category by ID.
    """
    category = crud.category.get(db, id=category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category

@router.delete("/{category_id}", response_model=schemas.Msg)
def delete_category(
    *,
    db: Session = Depends(deps.get_db),
    category_id: int,
) -> Any:
    """
    Delete a category.
    """
    category = crud.category.get(db, id=category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    crud.category.remove(db, id=category_id)
    return {"msg": "Category deleted successfully"}

# Bug: No authentication/authorization for any category endpoints
# Bug: delete_category doesn't check if there are foods associated with it, leading to foreign key errors
# Bug: update_category allows updating a category to a name that already exists
