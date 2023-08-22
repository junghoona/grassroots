from fastapi import APIRouter, Depends, Response, status
from typing import Union
from queries.attendees import AttendeeIn, attendeeRepository, AttendeeOut, Error


router = APIRouter()


@router.post("/api/attendees", response_model=Union[AttendeeOut, dict])
def create_attendee(
    attendee: AttendeeIn,
    response: Response,
    repo: attendeeRepository = Depends()
):
    ''' Create an attendee '''
    try:
        results = repo.create_attendee(attendee)
        return results
    except Error as e:
        if e.message == "Event does not exist" or e.message == "User does not exist":
            response.status_code = 404
            return {"message": e.message, "code": e.code}
        elif e.message == "Attendee already exists":
            response.status_code = 409
            return {"message": e.message, "code": e.code}


@router.get("/api/attendees/{event}", response_model=list[AttendeeOut])
def get_attendees_for_event(
    event: int,
    response: Response,
    repo: attendeeRepository = Depends()
):
    ''' Get all attendees for an event '''
    try:
        results = repo.get_attendees_for_event(event)
        return results
    except Error as e:
        if e.message == "Event does not exist":
            response.status_code = 404
            return {"message": e.message, "code": e.code}


@router.delete("/api/attendees/{event}/{attendee_id}")
def delete_attendee(
    event: int,
    attendee_id: int,
    response: Response,
    repo: attendeeRepository = Depends()
):
    ''' Delete an attendee '''
    try:
        results = repo.delete_attendee(attendee_id)
        return results
    except Error as e:
        if e.message == "Attendee does not exist":
            response.status_code = 404
            return {"message": e.message, "code": e.code}
