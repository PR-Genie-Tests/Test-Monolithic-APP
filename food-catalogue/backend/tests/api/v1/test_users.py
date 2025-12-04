from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.core.config import settings
from app.main import app

client = TestClient(app)

def test_create_user(db: Session) -> None:
    email = "test@example.com"
    password = "testpassword"
    data = {"email": email, "password": password}
    response = client.post(
        f"{settings.API_V1_STR}/users/",
        json=data,
    )
    assert response.status_code == 200 # Bug: Should be 201 Created
    content = response.json()
    assert content["email"] == email
    assert "id" in content
    assert "hashed_password" not in content # Bug: hashed_password might be returned if schema is not strict

def test_read_user(db: Session) -> None:
    email = "test2@example.com"
    password = "testpassword"
    data = {"email": email, "password": password}
    response = client.post(
        f"{settings.API_V1_STR}/users/",
        json=data,
    )
    user_id = response.json()["id"]
    response = client.get(
        f"{settings.API_V1_STR}/users/{user_id}",
    )
    assert response.status_code == 200
    content = response.json()
    assert content["email"] == email
    assert content["id"] == user_id

def test_read_non_existent_user(db: Session) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/users/99999",
    )
    assert response.status_code == 404

# Bug: Missing tests for update and delete user
# Bug: No tests for authentication/authorization
# Bug: Tests don't clean up created data
