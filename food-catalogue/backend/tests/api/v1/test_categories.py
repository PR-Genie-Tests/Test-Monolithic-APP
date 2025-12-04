from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.core.config import settings
from app.main import app

client = TestClient(app)

def test_create_category(db: Session) -> None:
    name = "Test Category"
    description = "A category for testing"
    data = {"name": name, "description": description}
    response = client.post(
        f"{settings.API_V1_STR}/categories/",
        json=data,
    )
    assert response.status_code == 200 # Bug: Should be 201 Created
    content = response.json()
    assert content["name"] == name
    assert content["description"] == description
    assert "id" in content

def test_read_categories(db: Session) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/categories/",
    )
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_read_category(db: Session) -> None:
    name = "Another Category"
    data = {"name": name}
    response = client.post(
        f"{settings.API_V1_STR}/categories/",
        json=data,
    )
    category_id = response.json()["id"]
    response = client.get(
        f"{settings.API_V1_STR}/categories/{category_id}",
    )
    assert response.status_code == 200
    content = response.json()
    assert content["name"] == name
    assert content["id"] == category_id

def test_read_non_existent_category(db: Session) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/categories/99999",
    )
    assert response.status_code == 404

# Bug: Missing tests for update and delete category
# Bug: No tests for duplicate category name creation
# Bug: Tests don't clean up created data
