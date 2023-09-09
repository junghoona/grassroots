from queries.members import MemberRepository
from fastapi.testclient import TestClient
from main import app
from queries.users import UserOutWithPassword
from authenticator import authenticator


client = TestClient(app)


def fake_get_current_account_data():
    return UserOutWithPassword(
        id=1,
        first_name="Long",
        last_name="Guan",
        avatar=None,
        bio=None,
        city="Seattle",
        state="WA",
        email="long@gmail.com",
        hashed_password="password",
    )


class fake_MemberRepository:
    def create_member(self, member):
        return {"message": "community and user not found"}

    def get_members(self, community_id):
        return (
            [
                {
                    "id": 1,
                    "community": 1,
                    "person": 1,
                    "first_name": "long",
                    "last_name": "guan",
                    "avatar": "test",
                    "bio": "test",
                    "city": "test",
                    "state": "wa"
                },
                {
                    "id": 2,
                    "community": 2,
                    "person": 1,
                    "first_name": "long",
                    "last_name": "guan",
                    "avatar": "test",
                    "bio": "test",
                    "city": "test",
                    "state": "wa"
                }
            ]
        )


# test for not logged in user and prevents user from creating a member
def test_unauthorized_create_member():
    # Arrange
    app.dependency_overrides[MemberRepository] = fake_MemberRepository
    json = {
        "community": 1,
        "person": 1
    }
    # Act
    response = client.post("/api/members/", json=json)
    # Clean up
    app.dependency_overrides = {}
    # Assert
    assert response.status_code == 401
    assert response.json() == {"detail": "Invalid token"}


def test_create_member_400_error():
    # Arrange
    app.dependency_overrides[MemberRepository] = fake_MemberRepository
    app.dependency_overrides[authenticator.get_current_account_data] = fake_get_current_account_data
    json = {
        "community": 1,
        "person": 1
    }

    expected = {"message": "community and user not found"}
    # Act
    response = client.post("/api/members/", json=json)
    # Clean up
    app.dependency_overrides = {}
    # Assert
    assert response.status_code == 404
    assert response.json() == expected


def test_get_member():
    # Arrange
    app.dependency_overrides[MemberRepository] = fake_MemberRepository
    app.dependency_overrides[authenticator.get_current_account_data] = fake_get_current_account_data

    expected = [
        {
            "id": 1,
            "community": 1,
            "person": 1,
            "first_name": "long",
            "last_name": "guan",
            "avatar": "test",
            "bio": "test",
            "city": "test",
            "state": "wa"
        },
        {
            "id": 2,
            "community": 2,
            "person": 1,
            "first_name": "long",
            "last_name": "guan",
            "avatar": "test",
            "bio": "test",
            "city": "test",
            "state": "wa"
        }
    ]

    # Act
    response = client.get("/api/members/1")
    # Clean up
    app.dependency_overrides = {}
    # Assert
    assert response.json() == expected
    assert response.status_code == 200
