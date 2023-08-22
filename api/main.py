from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import users, members, attendees, communities

app = FastAPI()
app.include_router(users.router)
app.include_router(members.router)
app.include_router(attendees.router)
app.include_router(communities.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
