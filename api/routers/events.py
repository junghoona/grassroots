from typing import List, Union
from fastapi import APIRouter, Depends, Response
from authenticator import authenticator
from queries.events import (
    Error,
    EventIn,
    EventOut,
    EventRepository,
    UpdatedEventIn
)
from queries.attendees import AttendeeIn, attendeeRepository

router = APIRouter()


@router.post("/api/events", response_model=Union[EventOut, Error])
async def create_event(
    event: EventIn,
    response: Response,
    repo: EventRepository = Depends(),
    attendee_repo: attendeeRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    '''Create AN instance of an event'''
    new_event = repo.create(event)
    if isinstance(new_event, dict) and new_event.get("code") is not None:
        response.status_code = new_event["code"]
    else:
        attendee_repo.create_attendee(AttendeeIn(
            event=new_event.id,
            person=event.creator
        ))
    return new_event


@router.get("/api/events/{event_id}", response_model=Union[EventOut, Error])
def get_one_event(
    event_id: int,
    response: Response,
    repo: EventRepository = Depends()
) -> EventOut:
    '''Get one specific event'''
    event = repo.get_event(event_id)
    if isinstance(event, dict) and event.get("code") is not None:
        response.status_code = event["code"]
    return event


@router.delete("/api/events/{event_id}", response_model=Union[dict, Error])
async def delete_event(
    event_id: int,
    response: Response,
    repo: EventRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> dict:
    '''Get one specific event'''
    result = repo.delete(event_id)
    if isinstance(result, dict) and result.get("code"):
        response.status_code = result["code"]
    return result


@router.get("/api/events", response_model=Union[List[EventOut], Error])
def get_events(
    response: Response,
    repo: EventRepository = Depends()
):
    '''Get ALL instances of events in a list response'''
    events = repo.get_all()
    if isinstance(events, dict) and events.get("code") is not None:
        response.status_code = events["code"]
    return events


@router.put("/api/events/{event_id}", response_model=Union[EventOut, Error])
async def update_event(
    event_id: int,
    event: UpdatedEventIn,
    response: Response,
    repo: EventRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[EventOut, Error]:
    '''Update an Event'''
    updated_event = repo.update(event_id, event)
    if isinstance(updated_event, dict) and updated_event.get("code") is not None:
        response.status_code = updated_event["code"]
    return updated_event


@router.get("/api/events/user/{user_id}", response_model=Union[List[EventOut], Error])
async def get_events_user_in(
    user_id: int,
    response: Response,
    repo: EventRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        results = repo.get_events_user_in(user_id)
        return results
    except Exception:
        response.status_code = 503
        return {"message": "Data server is down", "code": "503"}
