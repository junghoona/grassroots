from queries.members import MemberRepository
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


class fake_MemberRepository:
    def create_member(self, member):
        return {
            "id": 1,
            "community": 3,
            "person": 16
        }

    def get_all_members(self):
        return (
            [
                {
                    "id": 1,
                    "community": 1,
                    "person": 1
                },
                {
                    "id": 2,
                    "community": 2,
                    "person": 1
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
