### Wednesday Aug 23, 2023

Attempted to finish GET an event and DELETE an event fastAPI endpoints but ran into debugging issues for error handling. Still struggling to understand how to properly write the Error class BaseModel to properly handle the code and message I want sent back if my try block does not succeed. Ended up implementing an Error class Exception rather than BaseModel an __init__ and __str__ method to pass message and error to my error handling except blocks where needed. This meant that I had to refactor my queries.events and routers.events files. I did not finish this portion and will pick it up tomorrow before writing a PUT method on events in a new dev branch. Once that is complete my backend endpoints will be finished.

Worked as a group on exploring backend Authentication setup in order to implement account creation, login/logout, and protected endpoints by end of the week. We ran into many server errors while working to understand how to implement the conversion of our password property on User model to a hashed_password. Sharing screen and coding together was really helpful and encouraging during the debugging process. We ended up changing our User model property from password to hashed_password and then had our UserIn BaseModel receive a password (since our BaseModels have NOTHING to do with our database) and then our UserOut BaseModel gave backa hashed_password.


### Tuesday Aug 22, 2023

Continued building out backend fastAPI endpoints for the events entity.

Completed the following tasks:

> added get_all method to the EventRepository in queries.events.py
> added get_events method for @router.get fastAPI endpoint in routers.events.py
> merge request for post_events dev branch approved and merged to main
> merge request for get_events dev branch approved and merged to main

Resolved the following Errors:

> TypeError tuple out of range in queries.events.py for get all events list | RESOLVE = removed () from  my sql SELECT list

### Monday Aug 21, 2023

Continued building out backend fastAPI endpoints for the events entity.

Completed the following tasks:

> added create method to the EventRepository in queries.events.py
> added create_event method for @router.post fastAPI endpoint in routers.events.py
> merge request for post_events dev branch sent and tested
> fixed error handling in post_events dev for create method

Resolved the following Errors:

> Fixed error handling by using the pydantic BaseModel Error class correctly by returning a
Base(message="") in except block for create method and checked if isinstance of Error class in routers.events.py create_event method

### Thursday Aug 17, 2023

Started building out backend fastAPI endpoints for the events entity

Endpoints will include the following:

> POST event
> GET events
> GET AN event
> DELETE AN event

Created queries.events.py file for EventIn, EventOut BaseModels and EventRepository methods

Created routers.events.py file for endpoint methods

### Wednesday Aug 16, 2023

Mob programmed initial migrations data tables together
Mob programmed first api endpoints for users

tables include:
> users
> communities
> members
> events
> attendees

### Tuesday Aug 15, 2023

Finished project setup with the team:
> forked and cloned project repo
> removed forked relationship
> blocked merge to main in settings
> set up volume and database settings in docker-compose.yaml file

### Monday Aug 14, 2023

Finished Wireframing as a team
Finished fastAPI endpoints design as a team
Finished Model Designs as a team

### Friday Aug 11, 2023

Wrote team code of conduct
Developed Agile methodology for team project
> decided on gitlab for user story management
Began writing user story issues in gitlab as a team

### Thursday Aug 10, 2023

Began FastAPI endpoint design as a team

### Wednesday Aug 9, 2023

Began Model designs as a team

### Tuesday Aug 8, 2023

Began wireframing app as a team

### Monday Aug 7, 2023

Came up with project idea and scope as a team
