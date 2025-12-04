from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, schemas
from app.api import deps

router = APIRouter()

@router.get("/", response_model=List[schemas.Food])
def read_foods(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve foods.
    """
    foods = crud.food.get_multi(db, skip=skip, limit=limit)
    return foods

@router.post("/", response_model=schemas.Food)
def create_food(
    *,
    db: Session = Depends(deps.get_db),
    food_in: schemas.FoodCreate,
) -> Any:
    """
    Create new food.
    """
    # Bug: No check for duplicate food name within the same category
    # Bug: No validation if category_id exists
    food = crud.food.create(db, obj_in=food_in)
    return food

@router.put("/{food_id}", response_model=schemas.Food)
def update_food(
    *,
    db: Session = Depends(deps.get_db),
    food_id: int,
    food_in: schemas.FoodUpdate,
) -> Any:
    """
    Update a food.
    """
    food = crud.food.get(db, id=food_id)
    if not food:
        raise HTTPException(status_code=404, detail="Food not found")
    # Bug: Allows updating category_id to a non-existent category
    food = crud.food.update(db, db_obj=food, obj_in=food_in)
    return food

@router.get("/{food_id}", response_model=schemas.Food)
def read_food(
    food_id: int,
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Get food by ID.
    """
    food = crud.food.get(db, id=food_id)
    if not food:
        raise HTTPException(status_code=404, detail="Food not found")
    return food

@router.delete("/{food_id}", response_model=schemas.Msg)
def delete_food(
    *,
    db: Session = Depends(deps.get_db),
    food_id: int,
) -> Any:
    """
    Delete a food.
    """
    food = crud.food.get(db, id=food_id)
    if not food:
        raise HTTPException(status_code=404, detail="Food not found")
    crud.food.remove(db, id=food_id)
    return {"msg": "Food deleted successfully"}

# Bug: No authentication/authorization for any food endpoints
# Bug: Price validation (e.g., positive) is missing at the API level
