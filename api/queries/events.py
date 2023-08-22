from pydantic import BaseModel
from typing import Union
from datetime import date
from queries.pool import pool


class Error(BaseModel):
    message: str


class EventIn(BaseModel):
    name: str
    location: str
    city: str
    state: str
    type: str
    description: str
    creator: int
    community: int
    day: str
    start_time: str
    end_time: str


class EventOut(BaseModel):
    id: int
    name: str
    location: str
    city: str
    state: str
    type: str
    description: str
    creator: int
    community: int
    day: str
    start_time: str
    end_time: str


class EventRepository:
    '''Event Repository Pattern for Database'''
    # KEEP THIS code for GET List issue in next merge
    # def get_all(self) -> Union[List[EventOut], Error]:
    #     with pool.connection as conn:
    #         with conn.cursor as db:
    #             result = db.execute(
    #                 """
    #                 SELECT (name, location, city, state, type, description,
    #                         creator, community, day, start_time, end_time)
    #                 FROM events
    #                 ORDER BY day;
    #                 """
    #             )
    #             result = []
    #             for record in db:
    #                 event = EventOut()
    #                 result.append(event)
    #             return result

    def create(self, event: EventIn) -> Union[EventOut, Error]:
        '''Create method for EventRepo'''
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO events
                            (name, location, city, state, type, description,
                            creator, community, day, start_time, end_time)
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                            RETURNING id;
                        """,
                        [
                            event.name,
                            event.location,
                            event.city,
                            event.state,
                            event.type,
                            event.description,
                            event.creator,
                            event.community,
                            event.day,
                            event.start_time,
                            event.end_time
                        ]
                    )
                    id = result.fetchone()[0]
                    old_data = event.dict()
                    return EventOut(id=id, **old_data)
        except Exception as e:
            # return {"message": str(e)}
            return Error(message=str(e))
