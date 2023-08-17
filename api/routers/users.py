from fastapi import APIRouter, Depends
from queries.users import UserIn, userRepository, UserOut

router = APIRouter()


@router.post("/api/users", response_model=UserOut)
def create_user(
    user: UserIn,
    repo: userRepository = Depends()
):
    return repo.create_user(user)
