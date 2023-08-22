from fastapi import APIRouter, Depends, Response
from typing import List, Union
from queries.communities import (
    Error,
    CommunityIn,
    CommunityOut,
    CommunityRepository
)


router = APIRouter()


@router.post("/api/communities", response_model=Union[CommunityOut, Error])
def create_community(
    community: CommunityIn,
    response: Response,
    repo: CommunityRepository = Depends()
):
    '''Create an instance of community'''
    community = repo.create_community(community)
    if isinstance(community, dict) and community.get('message') is not None:
        response.status_code = 404
    return community


@router.get("/api/communities/{community_id}", response_model=Union[CommunityOut, Error])
def get_community(
    community_id: int,
    response: Response,
    repo: CommunityRepository = Depends()
):
    '''Get a single instance of a community'''
    community = repo.get_community(community_id)
    if isinstance(community, dict) and community.get('message') is not None:
        response.status_code = 404
    return community


@router.get("/api/communities", response_model=Union[List[CommunityOut], Error])
def get_communities(
    repo: CommunityRepository = Depends()
):
    '''Get a list of all community instances'''
    return repo.get_communities()
