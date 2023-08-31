from pydantic import BaseModel
from typing import Optional
from queries.pool import pool
from typing import Union


class Error(BaseModel):
    message: str
    code: int


class UserIn(BaseModel):
    first_name: str
    last_name: str
    avatar: Optional[str]
    bio: Optional[str]
    city: str
    state: str
    email: str
    password: str


class UpdatedUserIn(BaseModel):
    avatar: Optional[str]
    bio: Optional[str]
    city: str
    state: str


class UserOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    avatar: Optional[str]
    bio: Optional[str]
    city: str
    state: str
    email: str


class UserOutWithPassword(UserOut):
    hashed_password: str


class UserRepository:
    def create_user(self, info: UserIn, hashed_password: str) -> UserOutWithPassword:
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
                        hashed_password
                    )
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING
                        id,
                        first_name,
                        last_name,
                        avatar,
                        bio,
                        city,
                        state,
                        email,
                        hashed_password;
                    """,
                    [
                        info.first_name,
                        info.last_name,
                        info.avatar,
                        info.bio,
                        info.city,
                        info.state,
                        info.email,
                        hashed_password
                    ]
                )
                record = result.fetchone()
                return UserOutWithPassword(
                        id=record[0],
                        first_name=record[1],
                        last_name=record[2],
                        avatar=record[3],
                        bio=record[4],
                        city=record[5],
                        state=record[6],
                        email=record[7],
                        hashed_password=record[8]
                    )

    def update(self, user_id: int, user: UpdatedUserIn) -> Union[UserOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE users
                        SET avatar = %s
                          , bio = %s
                          , city = %s
                          , state = %s
                        WHERE id = %s;
                        """,
                        [
                            user.avatar,
                            user.bio,
                            user.city,
                            user.state,
                            user_id
                        ]
                    )
                    result = db.execute(
                        """
                        SELECT * FROM users
                        where id = %s
                        """,
                        [user_id]
                    )

                    record = result.fetchone()
                    if record is None:
                        raise ValueError("User does not exist")
                    return UserOut(
                        id=record[0],
                        first_name=record[1],
                        last_name=record[2],
                        avatar=record[3],
                        bio=record[4],
                        city=record[5],
                        state=record[6],
                        email=record[7],
                    )
        except ValueError as e:
            return {"message": str(e), "code": 400}
        except Exception as e:
            return {"message": str(e), "code": 400}

    def get_user(self, email: str) -> UserOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT
                        id,
                        first_name,
                        last_name,
                        avatar,
                        bio,
                        city,
                        state,
                        email,
                        hashed_password
                    FROM users
                    WHERE email = %s
                    """,
                    [email]

                )
                record = result.fetchone()
                if record is None:
                    return {"message": "Invalid ID"}
                return UserOutWithPassword(
                        id=record[0],
                        first_name=record[1],
                        last_name=record[2],
                        avatar=record[3],
                        bio=record[4],
                        city=record[5],
                        state=record[6],
                        email=record[7],
                        hashed_password=record[8]
                )
