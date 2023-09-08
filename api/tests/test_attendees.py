from fastapi.testclient import TestClient
from main import app
from routers.attendees import attendeeRepository


client = TestClient(app)


class fake_attendee_Repo:
    def get_attendees_for_event(self, event):
        return [{"id": 1, "event": 1, "person": 1}]

    def create_attendee(self, attendee):
        return {"id": 1, "event": 1, "person": 1}

    def get_attendees_for_event_detailed(self, event):
        return [
            {
                "id": 1,
                "event": 1,
                "person": 1,
                "first_name": "Vincenzo",
                "last_name": "Squingillini linguini",
                "avatar": "SAMPLE AVATAR",
                "bio": "Gabagool go hard",
                "city": "New York",
                "state": "NY",
            }
        ]


def test_get_event_attendees():
    app.dependency_overrides[attendeeRepository] = fake_attendee_Repo
    response = client.get("/api/attendees/1")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == [{"id": 1, "event": 1, "person": 1}]


def test_delete_attendee_not_logged_in():
    app.dependency_overrides[attendeeRepository] = fake_attendee_Repo
    response = client.delete("/api/attendees/1/1")
    app.dependency_overrides = {}
    assert response.status_code == 401


def test_get_event_attendees_detailed():
    app.dependency_overrides[attendeeRepository] = fake_attendee_Repo
    response = client.get("/api/attendees/1/details")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == [
        {
            "id": 1,
            "event": 1,
            "person": 1,
            "first_name": "Vincenzo",
            "last_name": "Squingillini linguini",
            "avatar": "SAMPLE AVATAR",
            "bio": "Gabagool go hard",
            "city": "New York",
            "state": "NY",
        }
    ]
