from routers import users, members, attendees, events, communities
from fastapi.middleware.cors import CORSMiddleware
from authenticator import authenticator
from fastapi import FastAPI
import os

app = FastAPI()
app.include_router(users.router)
app.include_router(members.router)
app.include_router(attendees.router)
app.include_router(events.router)
app.include_router(communities.router)
app.include_router(authenticator.router)

origins = [
    "http://localhost:3000",
    os.environ.get("CORS_HOST", None),
    "https://good-coders.gitlab.io",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "You hit the root path!"}


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00"
        }
    }
