## APIs

### Users
- Method: POST, PUT, GET, GET
- Path: /api/accounts, /api/user/{user_id}, /token

**Pydantic BaseModel**

POST Input:
```
first_name: str
last_name: str
avatar: Optional[str]
bio: Optional[str]
city: str
state: str
email: str
password: str
```
PUT Input:
```
avatar: Optional[str]
bio: Optional[str]
city: str
state: str
```

Output:
```
id: int
first_name: str
last_name: str
avatar: Optional[str]
bio: Optional[str]
city: str
state: str
email: str
```
### Members
- Method: POST, GET, DELETE
- Path: /api/members/, api/members/{community_id}, /api/members/{community_id}/{user_id}

**Pydantic BaseModel**

POST Input:
```
community: int
person: int
```
Output:
```
id: int
community: int
person: int
```
Output (Detailed):
```
id: int
community: int
person: int
first_name: str
last_name: str
avatar: str
bio: str
city: str
state: str
```
### Attendees
- Method: POST, GET, DELETE
- Path: /api/attendees, /api/attendees/{event}, /api/attendees/{event_id}/{user_id}

**Pydantic BaseModel**

POST Input:
```
event: int
person: int
```
Output:
```
id: int
event: int
person: int
```
Output (Detailed):
```
id: int
event: int
person: int
first_name: str
last_name: str
avatar: str
bio: str
city: str
state: str
```
### Communities
- Method: POST, GET, GET, GET, DELETE
- Path: /api/communities, /api/communities/{community_id}, /api/communities/user/{user_id}

**Pydantic BaseModel**

POST Input:
```
name: str
city: str
state: str
type: Optional[str]
description: Optional[str]
creator_id: int
```
Output:
```
id: int
name: str
city: str
state: str
type: Optional[str]
description: Optional[str]
creator_id: int
```
### Events
- Method: POST, GET, GET, GET, PUT, DELETE
- Path: /api/events, /api/events/{event_id}, /api/events/user/{user_id}

**Pydantic BaseModel**

POST Input:
```
name: str
location: str
city: str
state: str
type: str
description: str
creator: int
community: int
day: str
start_time: str
end_time: str
image: str
```
PUT Input:
```
location: str
description: str
day: str
start_time: str
end_time: str
image: str
```
Output:
```
id: int
name: str
location: str
city: str
state: str
type: str
description: str
creator: int
community: int
day: str
start_time: str
end_time: str
image: str
```
