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

class MemberListOut(BaseModel):
    members: list[MemberOut]

class MemberRepository:
    def create_member(self, member: MemberIn) -> MemberOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute("SELECT EXISTS(SELECT * FROM communities where id=(%s))", [member.community])
                community_exist = db.fetchone()[0]
                db.execute("SELECT EXISTS(SELECT * FROM users where id=(%s))", [member.person])
                user_exist = db.fetchone()[0]
                # check if both community and user do not exist
                if not community_exist and not user_exist:
                    return {"message": "community and user not found"}
                # check if community exists
                if not community_exist:
                    return {"message": "community not found"}
                # check if user exists
                if not user_exist:
                    return {"message": "user not found"}
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
    def get_all_members(self) -> MemberOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id, community, person
                    FROM members
                    ORDER BY community, person
                    """
                )
                results = []
                for row in db.fetchall():
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]
                    results.append(MemberOut(**record))
                return results
    def get_members(self, community_id) -> MemberOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute("SELECT EXISTS(SELECT * FROM communities where id=(%s))", [community_id])
                # check if community exists
                if not db.fetchone()[0]:
                    return {"message": "community does not exist"}
                db.execute(
                    """
                    SELECT id, community, person
                    FROM members
                    WHERE community=%s
                    ORDER BY person
                    """,
                    [community_id]
                )
                results = []
                for row in db.fetchall():
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]
                    results.append(MemberOut(**record))
                return results
