from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.core.config import settings
from app.main import app

client = TestClient(app)

def test_create_food(db: Session) -> None:
    # First, create a category
    category_name = "Test Food Category"
    category_data = {"name": category_name}
    category_response = client.post(
        f"{settings.API_V1_STR}/categories/",
        json=category_data,
    )
    category_id = category_response.json()["id"]

    name = "Test Food Item"
    description = "A delicious test food"
    price = 12.99
    data = {"name": name, "description": description, "price": price, "category_id": category_id}
    response = client.post(
        f"{settings.API_V1_STR}/foods/",
        json=data,
    )
    assert response.status_code == 200 # Bug: Should be 201 Created
    content = response.json()
    assert content["name"] == name
    assert content["description"] == description
    assert content["price"] == price
    assert content["category_id"] == category_id
    assert "id" in content

def test_read_foods(db: Session) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/foods/",
    )
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_read_food(db: Session) -> None:
    # First, create a category
    category_name = "Another Food Category"
    category_data = {"name": category_name}
    category_response = client.post(
        f"{settings.API_V1_STR}/categories/",
        json=category_data,
    )
    category_id = category_response.json()["id"]

    name = "Another Food Item"
    data = {"name": name, "price": 9.99, "category_id": category_id}
    response = client.post(
        f"{settings.API_V1_STR}/foods/",
        json=data,
    )
    food_id = response.json()["id"]
    response = client.get(
        f"{settings.API_V1_STR}/foods/{food_id}",
    )
    assert response.status_code == 200
    content = response.json()
    assert content["name"] == name
    assert content["id"] == food_id

def test_read_non_existent_food(db: Session) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/foods/99999",
    )
    assert response.status_code == 404

# Bug: Missing tests for update and delete food
# Bug: No tests for invalid category_id on food creation/update
# Bug: No tests for price validation (e.g., negative price)
# Bug: Tests don't clean up created data
