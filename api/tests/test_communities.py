from queries.communities import CommunityRepository
from fastapi.testclient import TestClient
from authenticator import authenticator
from pydantic import BaseModel
from typing import Optional
from main import app


client = TestClient(app)


class UserOutWithPassword(BaseModel):
    id: int
    first_name: str
    last_name: str
    avatar: Optional[str]
    bio: Optional[str]
    city: str
    state: str
    email: str
    hashed_password: str


def fake_get_current_account_data():
    return UserOutWithPassword(
        id=1,
        first_name="PLACEHOLDER",
        last_name="PLACEHOLDER",
        avatar=None,
        bio=None,
        city="PLACEHOLDER",
        state="PLACEHOLDER",
        email="PLACEHOLDER",
        hashed_password="PLACEHOLDER"
    )


class EmptyCommunityRepos:
    def get_communities(self):
        return []


class CreateCommunityRepo:
    def create_community(self, community):
        result = {
            "id": 4,
            "name": "Demo Community",
            "city": "Cupertino",
            "state": "CA",
            "type": "string",
            "description": "string",
            "creator_id": 1
        }
        result.update(community)
        return result


def test_get_all_communities():
    # Arrange
    app.dependency_overrides[CommunityRepository] = EmptyCommunityRepos

    # Act
    response = client.get("/api/communities")
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == []


def test_create_community():
    # Arrange
    app.dependency_overrides[authenticator.get_current_account_data] = fake_get_current_account_data
    app.dependency_overrides[CommunityRepository] = CreateCommunityRepo

    # Act
    json = {
        "name": "PLACEHOLDER",
        "city": "PLACEHOLDER",
        "state": "PLACEHOLDER",
        "type": "PLACEHOLDER",
        "description": "PLACEHOLDER",
        "creator_id": 1
    }

    expected = {
        "id": 4,
        "name": "PLACEHOLDER",
        "city": "PLACEHOLDER",
        "state": "PLACEHOLDER",
        "type": "PLACEHOLDER",
        "description": "PLACEHOLDER",
        "creator_id": 1
    }

    response = client.post("/api/communities", json=json)

    # Clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == expected
