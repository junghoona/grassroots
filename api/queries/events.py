from pydantic import BaseModel
from typing import Union, List
from queries.pool import pool
from psycopg.errors import ForeignKeyViolation


class Error(BaseModel):
    message: str
    code: int


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
    image: str


class UpdatedEventIn(BaseModel):
    location: str
    description: str
    day: str
    start_time: str
    end_time: str
    image: str


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
    image: str


class EventRepository:
    """Event Repository Pattern for Database"""

    def get_event(self, event_id: int) -> Union[EventOut, Error]:
        """GET method for a specific event view"""
        try:
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
                            end_time,
                            image
                        FROM events
                        WHERE id = %s
                        """,
                        [event_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        raise ValueError("Event does not exist")
                    return EventOut(
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
                        end_time=record[11],
                        image=record[12],
                    )
        except ValueError as e:
            return {"message": str(e), "code": 404}
        except Exception as e:
            return {"message": str(e), "code": 500}

    def get_all(self) -> Union[List[EventOut], Error]:
        """GET method for list of events"""
        try:
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
                            end_time,
                            image
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
                            end_time=record[11],
                            image=record[12],
                        )
                        result.append(event)
                return result
        except Exception as e:
            return {"message": str(e), "code": 500}

    def create(self, event: EventIn) -> Union[EventOut, Error]:
        """Create method for event object"""
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
                            end_time,
                            image)
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
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
                            event.end_time,
                            event.image,
                        ],
                    )
                    event_id = result.fetchone()[0]
                    old_data = event.dict()
                    return EventOut(id=event_id, **old_data)
        except ForeignKeyViolation as e:
            return {"message": str(e), "code": 400}
        except Exception as e:
            return {"message": str(e), "code": 500}

    def delete(self, event_id: int) -> Union[dict, Error]:
        """Delete a specific event"""
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT EXISTS(SELECT * FROM events WHERE id = %s);
                        """,
                        [event_id],
                    )
                    record = result.fetchone()
                    if not record[0]:
                        raise ValueError("Event does not exist")
                    db.execute(
                        """
                        DELETE FROM attendees
                        WHERE event = %s;
                        """,
                        [event_id],
                    )
                    db.execute(
                        """
                        DELETE FROM events
                        WHERE id = %s
                        """,
                        [event_id],
                    )
                    return {"message": "Event deleted", "code": 200}
        except ValueError as e:
            return {"message": str(e), "code": 404}
        except Exception as e:
            return {"message": str(e), "code": 500}

    def update(
        self, event_id: int, event: UpdatedEventIn
    ) -> Union[EventOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE events
                        SET location = %s
                            , description = %s
                            , day = %s
                            , start_time = %s
                            , end_time = %s
                            , image = %s
                        WHERE id = %s;
                        """,
                        [
                            event.location,
                            event.description,
                            event.day,
                            event.start_time,
                            event.end_time,
                            event.image,
                            event_id,
                        ],
                    )
                    result = db.execute(
                        """
                        SELECT * FROM events
                        WHERE id = %s
                        """,
                        [event_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        raise ValueError("Event does not exist")
                    return EventOut(
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
                        end_time=record[11],
                        image=record[12],
                    )
        except ValueError as e:
            return {"message": str(e), "code": 404}
        except Exception as e:
            return {"message": str(e), "code": 400}

    def get_events_user_in(self, user_id: int) -> EventOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT events.id, events.name, events.location, events.city,
                    events.state, events.type, events.description, events.creator,
                    events.community, events.day, events.start_time, events.end_time
                    FROM events
                    JOIN attendees on (attendees.event = events.id)
                    JOIN users on (users.id = attendees.person)
                    WHERE users.id = %s
                    """,
                    [user_id],
                )
                results = []
                for row in db.fetchall():
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]
                    results.append(EventOut(**record))
                return results
