from pydantic import BaseModel
from typing import Union, List
from datetime import date
from queries.pool import pool


class Error(BaseModel):
    error: str
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
    def get_all(self) -> List[EventOut]:
        '''Get method for list of events'''
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT
                        id,
                        name,
                        location,
                        city,
                        state,
                        type,
                        description,
                        creator,
                        community,
                        day,
                        start_time,
                        end_time
                    FROM events
                    ORDER BY day
                    """,
                )
                result = []
                for record in db:
                    event = EventOut(
                        id=record[0],
                        name=record[1],
                        location=record[2],
                        city=record[3],
                        state=record[4],
                        type=record[5],
                        description=record[6],
                        creator=record[7],
                        community=record[8],
                        day=record[9],
                        start_time=record[10],
                        end_time=record[11]
                    )
                    result.append(event)
                return result

    def create(self, event: EventIn) -> Union[EventOut, Error]:
        '''Create method for event object'''
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO events
                            (name,
                            location,
                            city,
                            state,
                            type,
                            description,
                            creator,
                            community,
                            day,
                            start_time,
                            end_time)
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
            return Error(error=str(e), message="Could not create event: Invalid user ID")
