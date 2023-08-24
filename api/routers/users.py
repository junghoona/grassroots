from fastapi import (
    Depends,
    HTTPException,
    Response,
    APIRouter,
    Request
)
from queries.users import UserIn, UserRepository, UserOut, UserOutWithPassword
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from pydantic import BaseModel
from psycopg.errors import UniqueViolation


class UserForm(BaseModel):
    username: str
    password: str


class UserToken(Token):
    user: UserOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.get("/token", response_model=UserToken | None)
async def get_token(
    request: Request,
    user: UserOut = Depends(authenticator.try_get_current_account_data)
) -> UserToken | None:
    if user and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "user": user,
        }


@router.post("/api/accounts", response_model=UserToken | HttpError)
async def create_account(
    info: UserIn,
    request: Request,
    response: Response,
    repo: UserRepository = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        user = repo.create_user(info, hashed_password)
    except UniqueViolation:
        raise HTTPException(
            status_code = 400,
            detail="Error: Duplicate Account"
        )
    except Exception as e:
        print("ERROR", str(e))
        raise HTTPException(
            status_code = 400,
            detail="Error: Cannot create this account"
        )

    form = UserForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, repo)

    return UserToken(user=user, **token.dict())
