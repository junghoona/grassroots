from pydantic import BaseModel
from queries.pool import pool

class MemberIn(BaseModel):
    community: int
    person: int

class Error(BaseModel):
    message: str

class MemberOut(BaseModel):
    id: int
    community: int
    person: int

class MemberRepository:
    def create_member(self, member: MemberIn) -> MemberOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute("SELECT EXISTS(SELECT * FROM communities where id=(%s))", [member.community])
                # check if community exists
                if db.fetchone()[0]:
                    db.execute("SELECT EXISTS(SELECT * FROM users where id=(%s))", [member.person])
                    # check if user exists
                    if db.fetchone()[0]:
                        db.execute("SELECT EXISTS(SELECT * FROM members where person=(%s) AND community=(%s))", [member.person, member.community])
                        # check if member is already in community
                        if db.fetchone()[0]:
                            return {"message": "member is already in community"}
                        result = db.execute(
                            """
                            INSERT INTO members (
                                community,
                                person
                            )
                            VALUES (%s, %s)
                            RETURNING id;
                            """,
                            [
                                member.community,
                                member.person
                            ]
                        )
                        id = result.fetchone()[0]
                        old_data = member.dict()
                        return MemberOut(id=id, **old_data)
                    else:
                        return {"message": "user not found"}
                else:
                    return {"message": "community not found"}
