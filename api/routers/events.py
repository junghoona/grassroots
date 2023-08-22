from typing import List, Union
from fastapi import APIRouter, Depends, Response
from queries.events import (
    Error,
    EventIn,
    EventOut,
    EventRepository
)

router = APIRouter()


@router.post("/api/events", response_model=Union[EventOut, Error])
def create_event(
    event: EventIn,
    response: Response,
    repo: EventRepository = Depends()
):
    '''Create AN instance of an event'''
    result = repo.create(event)
    if isinstance(result, Error):
        response.status_code = 400
    return result


# KEEP CODE for getting events in next issue merge
# @router.get("/api/events", response_model=List[EventOut])
# def get_events(
#         repo: EventRepository = Depends()
# ):
#     '''Get ALL instances of events in a list response'''
#     return repo.get_all()
