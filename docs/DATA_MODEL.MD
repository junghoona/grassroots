## Data Models

### User

| NAME | TYPE | UNIQUE | REQUIRED |
| ---- | ---- | ---- | ---- |
id | Primary Key | Yes | Yes |
first_name | VarChar | No | Yes |
last_name | VarChar | No | Yes |
avatar | VarChar | No | Yes |
bio | text | No | No |
city | VarChar | No | Yes |
state | VarChar | No | Yes |
email | VarChar | Yes | Yes |
hashed_password | VarChar | No | Yes |

### Member

| NAME | TYPE | UNIQUE | REQUIRED |
| ---- | ---- | ---- | ---- |
id | Primary Key | Yes | Yes |
Community | int | Yes | Yes |
person | int | Yes | Yes |

### Community

| NAME | TYPE | UNIQUE | REQUIRED |
| ---- | ---- | ---- | ---- |
id | Primary Key | Yes | Yes |
name | VarChar | No | Yes |
location | Varchar | No | Yes |
city | VarChar | No | Yes |
state | VarChar | No | Yes |
type | Varchar | No | Yes |
description | Text | No | Yes |
creator | int | Yes | Yes |

### Attendee

| NAME | TYPE | UNIQUE | REQUIRED |
| ---- | ---- | ---- | ---- |
id | Primary Key | Yes | Yes |
event | int | Yes | Yes |
person | int | Yes | Yes |

### Event

| NAME | TYPE | UNIQUE | REQUIRED |
| ---- | ---- | ---- | ---- |
id | Primary Key | Yes | Yes |
name | VarChar | No | Yes |
location | Varchar | No | Yes |
city | VarChar | No | Yes |
state | VarChar | No | Yes |
type | Varchar | No | Yes |
description | Text | No | Yes |
creator | int | Yes | Yes |
community | int | Yes | Yes |
day | VarChar | No | Yes |
start_time | VarChar | No | Yes
end_time | VarChar | No | Yes
image | text | No | No |
