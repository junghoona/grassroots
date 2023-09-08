from queries.events import EventRepository
from fastapi.testclient import TestClient
from main import app
from authenticator import authenticator
from pydantic import BaseModel
from typing import Optional


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


class EmptyEventRepo:
    '''Test for empty list of events'''

    def get_all(self):
        return []


def test_get_empty_events():
    # Arrange
    app.dependency_overrides[EventRepository] = EmptyEventRepo

    # Act
    response = client.get("/api/events")
    # reset
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == []


class MockEventListRepo:
    '''Test for list of mock event objects'''

    def get_all(self):
        return [
            {
                "id": 1,
                "name": "string",
                "location": "string",
                "city": "string",
                "state": "string",
                "type": "string",
                "description": "string",
                "creator": 0,
                "community": 0,
                "day": "string",
                "start_time": "string",
                "end_time": "string"
            }
        ]


def test_get_all_events():

    # Arrange
    app.dependency_overrides[EventRepository] = MockEventListRepo

    # Act
    response = client.get("/api/events")
    # reset
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == [{
                "id": 1,
                "name": "string",
                "location": "string",
                "city": "string",
                "state": "string",
                "type": "string",
                "description": "string",
                "creator": 0,
                "community": 0,
                "day": "string",
                "start_time": "string",
                "end_time": "string"
            }]


class MockCreateEventRepo:

    '''Test for creating one mock event object'''

    def create(self, event):
        result = {
            "id": 1,
            "name": "string",
            "location": "string",
            "city": "string",
            "state": "string",
            "type": "string",
            "description": "string",
            "creator": 1,
            "community": 1,
            "day": "string",
            "start_time": "string",
            "end_time": "string"
        }
        result.update(event)
        return result


def test_create_event_valid():
    # Arrange
    app.dependency_overrides[authenticator.get_current_account_data] = fake_get_current_account_data
    app.dependency_overrides[EventRepository] = MockCreateEventRepo

    # Act
    json = {
        "name": "string",
        "location": "string",
        "city": "string",
        "state": "string",
        "type": "string",
        "description": "string",
        "creator": 1,
        "community": 1,
        "day": "string",
        "start_time": "string",
        "end_time": "string"
    }

    expected = {
        "id": 1,
        "name": "string",
        "location": "string",
        "city": "string",
        "state": "string",
        "type": "string",
        "description": "string",
        "creator": 1,
        "community": 1,
        "day": "string",
        "start_time": "string",
        "end_time": "string"
    }

    response = client.post("/api/events", json=json)
    # reset
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == expected


def test_create_event_invalid():
    # Arrange
    app.dependency_overrides[EventRepository] = MockCreateEventRepo

    # Act
    json = {
        "name": "string",
        "location": "string",
        "city": "string",
        "state": "string",
        "type": "string",
        "description": "string",
        "creator": 1,
        "community": 1,
        "day": "string",
        "start_time": "string",
        "end_time": "string"
    }

    response = client.post("/api/events", json=json)
    # reset
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 401
    assert response.json() == {'detail': 'Invalid token'}
