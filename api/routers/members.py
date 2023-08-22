from fastapi import APIRouter, Depends, Response
from queries.members import MemberIn, MemberOut, MemberRepository, Error, MemberListOut
from typing import Union

router = APIRouter()

@router.post("/api/members/", response_model=Union[MemberOut, Error])
def create_member(
    member: MemberIn,
    response: Response,
    repo: MemberRepository = Depends(),
):
    """
    Create a new member with the following info:
    - community: existing community.id
    - person: existing user.id
    """
    result = repo.create_member(member)
    try: # return error message
        if result.get("message") == "member is already in community":
            response.status_code = 400
            return result
        else:
            # for "user not found" , "community not found", or "user and communit not found"
            response.status_code = 404
            return result
    except: # return created member
        return result

@router.get("/api/members/", response_model=MemberListOut)
def get_members(
    repo: MemberRepository = Depends(),
):
    """
    Get all members and returns a list with the following:
    - id: members.id
    - community: communities.id
    - person: users.id
    """
    return {"members": repo.get_all_members()}
