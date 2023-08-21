from fastapi import APIRouter, Depends, Response
from queries.members import MemberIn, MemberOut, MemberRepository, Error
from typing import Union

router = APIRouter()

@router.post("/api/members/", response_model=Union[MemberOut, Error])
def create_member(
    member: MemberIn,
    response: Response,
    repo: MemberRepository = Depends(),
):
    result = repo.create_member(member)
    try: # return error message
        if result.get("message") == "user not found" or result.get("message") == "community not found":
            response.status_code = 404
            return result
        elif result.get("message") == "member is already in community":
            response.status_code = 400
            return result
    except: # return created member
        return result
