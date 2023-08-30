from pydantic import BaseModel
from queries.pool import pool


class AttendeeIn(BaseModel):
    event: int
    person: int


class AttendeeOut(BaseModel):
    id: int
    event: int
    person: int


class Error(Exception):
    def __init__(self, message, code):
        self.message = message
        self.code = code

    def __str__(self):
        return f"{self.message} ({self.code})"


class attendeeRepository:
    ''' Get all attendees for a particular event by event id '''
    def get_attendees_for_event(self, event: int) -> list[AttendeeOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute("SELECT EXISTS(SELECT * FROM events WHERE id = %s);", [event])
                if not db.fetchone()[0]:
                    raise Error(message="Event does not exist", code=404)

                db.execute(
                    """
                    SELECT id, event, person
                    FROM attendees
                    WHERE event = %s
                    """,
                    [event],
                )

                results = []
                for (id, event, person) in db.fetchall():
                    results.append(AttendeeOut(id=id, event=event, person=person))
                return results

    ''' Create an attendee of a particular event with user id '''
    def create_attendee(self, attendee: AttendeeIn) -> AttendeeOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute("SELECT EXISTS(SELECT * FROM events WHERE id = %s);", [attendee.event])
                if not db.fetchone()[0]:
                    raise Error(message="Event does not exist", code=404)

                db.execute("SELECT EXISTS(SELECT * FROM users WHERE id = %s);", [attendee.person])
                if not db.fetchone()[0]:
                    raise Error(message="User does not exist", code=404)

                db.execute("SELECT EXISTS(SELECT * FROM attendees WHERE event = %s AND person = %s);", [attendee.event, attendee.person])
                if db.fetchone()[0]:
                    raise Error(message="Attendee already exists", code=409)

                result = db.execute(
                    """
                    INSERT INTO attendees (
                        event,
                        person
                    )
                    VALUES (%s, %s)
                    RETURNING id;
                    """,
                    [
                        attendee.event,
                        attendee.person,
                    ]
                )
                id = result.fetchone()[0]
                old_data = attendee.dict()
                return AttendeeOut(id=id, **old_data)

    ''' Delete an attendee of a particular event by attendee id '''
    def delete_attendee(self, attendee_id: int) -> dict:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute("SELECT EXISTS(SELECT * FROM attendees WHERE id = %s);", [attendee_id])
                if not db.fetchone()[0]:
                    raise Error(message="Attendee does not exist", code=404)

                db.execute(
                    """
                    DELETE FROM attendees
                    WHERE id = %s
                    """,
                    [attendee_id],
                )
                return {"message": "Attendee deleted successfully", "code": 200}
