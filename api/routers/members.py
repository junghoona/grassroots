from fastapi import APIRouter, Depends, Response
from queries.members import MemberIn, MemberOut, MemberRepository, Error, MemberOutDetailed
from typing import Union, List
from authenticator import authenticator

router = APIRouter()


@router.post("/api/members/", response_model=Union[MemberOut, Error])
def create_member(
    member: MemberIn,
    response: Response,
    repo: MemberRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    """
    Create a new member with the following info:
    - community: existing community.id
    - person: existing user.id
    """
    result = repo.create_member(member)
    # return error message
    try:
        if result.get("message") == "member is already in community":
            response.status_code = 400
            return result
        else:
            # for "user not found" , "community not found", or "user and communit not found"
            response.status_code = 404
            return result
    # return created member
    except Exception:
        return result


@router.get("/api/members/{community_id}", response_model=Union[List[MemberOutDetailed], Error])
def get_members(
    community_id: int,
    response: Response,
    repo: MemberRepository = Depends(),
):
    """
    Get a list of members in that community with the following:
    - id: members.id
    - community: communities.id
    - person: users.id
    - user_info: {}
    """
    try:
        return repo.get_members(community_id)
    except Exception as e:
        return {"message": str(e)}


@router.delete("/api/members/{community_id}/{user_id}", response_model=bool)
def delete_member(
    user_id: int,
    community_id: int,
    repo: MemberRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.delete_member(community_id, user_id)
