from pydantic import BaseModel
from typing import Optional
from queries.pool import pool


class UserIn(BaseModel):
    first_name: str
    last_name: str
    avatar: Optional[str]
    bio: Optional[str]
    city: str
    state: str
    email: str
    password: str


class UserOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    avatar: Optional[str]
    bio: Optional[str]
    city: str
    state: str
    email: str
    password: str


class userRepository:
    def create_user(self, user: UserIn) -> UserOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO users (
                        first_name,
                        last_name,
                        avatar,
                        bio,
                        city,
                        state,
                        email,
                        password
                    )
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        user.first_name,
                        user.last_name,
                        user.avatar,
                        user.bio,
                        user.city,
                        user.state,
                        user.email,
                        user.password
                    ]
                )
                id = result.fetchone()[0]
                old_data = user.dict()
                return UserOut(id=id, **old_data)
