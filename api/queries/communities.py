from pydantic import BaseModel
from typing import List, Optional, Union
from queries.pool import pool


class Error(BaseModel):
    message: str

class CommunityIn(BaseModel):
    name: str
    city: str
    state: str
    type: Optional[str]
    description: Optional[str]
    creator_id: int


class CommunityOut(BaseModel):
    id: int
    name: str
    city: str
    state: str
    type: Optional[str]
    description: Optional[str]
    creator_id: int


class CommunityRepository:
    def create_community(self, community: CommunityIn) -> CommunityOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO communities (
                            name,
                            city,
                            state,
                            type,
                            description,
                            creator_id
                        )
                        VALUES (%s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            community.name,
                            community.city,
                            community.state,
                            community.type,
                            community.description,
                            community.creator_id
                        ]
                    )
                    id = result.fetchone()[0]
                    old_data = community.dict()
                    return CommunityOut(id=id, **old_data)
        except Exception as e:
            print(e)
            return {"message": "Invalid User Id - Creator does not exist"}

    def get_community(self, community_id: int) -> Union[Optional[CommunityOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                             , name
                             , city
                             , state
                             , type
                             , description
                             , creator_id
                        FROM communities
                        WHERE id = %s
                        """,
                        [community_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return {"message": "Invalid Id - Community does not exist"}

                    return CommunityOut(
                        id=record[0],
                        name=record[1],
                        city=record[2],
                        state=record[3],
                        type=record[4],
                        description=record[5],
                        creator_id=record[6],
                    )
        except Exception as e:
            print(e)
            return {"message": "Could not get the Community"}

    def get_communities(self) -> List[CommunityOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                             , name
                             , city
                             , state
                             , type
                             , description
                             , creator_id
                        FROM communities
                        ORDER BY name, creator_id
                        """,
                    )
                    result = []
                    for record in db:
                        community = CommunityOut(
                            id=record[0],
                            name=record[1],
                            city=record[2],
                            state=record[3],
                            type=record[4],
                            description=record[5],
                            creator_id=record[6]
                        )
                        result.append(community)
                    return result
        except Exception as e:
            print(e)
            return {"message": "Could not get all communities"}

    def delete_community(self, community_id: int) -> Union[bool, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM communities
                        WHERE id = %s
                        """,
                        [community_id],
                    )
        except Exception as e:
            print(e)
            return {"message": "Invalid Community ID - Could not delete the Community"}
