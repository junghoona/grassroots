### Thursday Aug 31, 2023

Before diving into the world of bootstrap and beautifying my page designs I need to finish 2 more elements: The main page (which will include our stretch goal with the use of a third party API to display endarngered specices sightings nearby user location) and the create an event form for logged in members. Today I wrote the form. I added an EventsForm.js file to the ghi/src dir. I then wrote a fetch to communities and ended up copying the 3rd party locations api to fetch states as the code was written in the create a community form file inside the scope of the function and I was unable to export the fetch. I will eventually want to refactor this by asking John to move the fetch states function up above the scope of the form function and then export it explicitly but it is not priority. I then wrote and rendered the form, realizing that the creator field was not supposed to be an input but rather the value of the logged in user id filling out the form. To grab this value I needed to import the getCurrentUser method from UserProfilePage.js. In order to do THAT I needed to refactor the fetch user account data function (much the same as getStates function will need to be refactored to the global state) by moving it up above the userProfilePage function to the global state then exporting it explicitly. I also had to move the setUser from the fetch function down into the useEffect inside the userProfilePage() function. I did this by just returning data.user in the fetchUser then adding .then method to the fetchUser call inside the useEffect and adding an annonymous function inside .then to set the user. That looks like this (refactored userprofile):

```
export async function getCurrentUser() {
  const url = `${process.env.REACT_APP_API_HOST}/token`;
  const response = await fetch(url, {
    credentials: "include",
  });
  if (response.ok) {
    const data = await response.json();
    console.log("ALERT:", data)
    **return data.user;**
  }
  throw Error(`Failed to fetch user data! ${response}`);
}

function UserProfilePage() {
  **const [userData, setUserData] = useState({});**
  const { token } = useToken();


  useEffect(() => {
    if (token) {
      getCurrentUser().then((user) => setUserData(user));
    }
  }, [token]);

  return("stuff")
}
```

**I will still need to make sure to filter the communities list to only include those communities that the logged in user is a member of so that a user can only post an event to a community they are members of.**

### Wednesday Aug 30, 2023

I returned to my community profile page and members list today. In order to do this in 2 different files I did the following:

Since I already wrote my community react hooks and setCommunity state on a fetch a specific community function in the community profile file, I imported the fetchCommunity function as a component and passed community_id into my aysnc fetch members function as a parameter, then added fetchCommunity to my useEffect and utilized .then method to set community to data response. I also made sure to write the fetch members function globally so that I could export it and use it in my community profile page much the same way. I then wrote a simple list rending on the members list page and then finished working on community profile page by importing the fetchMembers function as a component and setting members and community within the useEffect call on fetchCommunity and fetchMembers by using the .then method and writing an arrow function to handle setting the data to the react hook states for each. Each page shares the same compnents almost but will be rendering a different interface. For now the pages are functional but very bare bones visually. I will  need to explore more bootstrap to add more elements to render on the profile page and maybe add a bit more elegance to the simple members list page.

### Tuesday Aug 29, 2023

Began unit testing for our individual backend endpoints. I added a test_events.py file to api/tests dir. Started my creating an EmptyEventsList class and a test_get_empty_list function. I then copied over the UserOutWithPassword pydantic baseModel and defined a 'fake' get user account data method that just returns a UserOutWithPassword instance with mock values. I used this to write a MockCreateEvent class and test_create_event_valid method and test_create_event_invalid method for both verified and unverified users. I also wrote another MockEventListRepo and a test_get_all_events methods. While writing these unit tests and they would fail due to assertion errors. I then noticed I needed to change the value I was asserting. All tests are passing.

### Monday Aug 28, 2023

Reviewed continuous integration and deployment with the team and began backend deployment. Verified our gitlab accounts and made sure our code linters were set up so that we would now be passing our pipelines when creating merge requests on our dev branches. Sent up a merge request for backend deployment and pipelines are passing.

### Friday Aug 25, 2023

Reviewed user issues board with team to determine frontend elements division. Divided and assigned frontend components and began working async on rendering list view, forms, object view, navbar etc. I began with creating a CommunityProfile.js file in the ghi/src directory. I began writing a fetch for members of a community in the community profile file then realized I and others may want to utilize the fetch members list in other frontend components. I created a new file for MembersList.py and wrote an async function to fetch the members of a specific community. I know that there is a simple way to import the fetch community function to set to the community id in the members list function but I am struggling to wrtap my mind around it.

### Thursday Aug 24, 2023

Wrote the rest of the event endpoint queries. Wrote a PUT method for editing an event. Having a 180 turn around on understanding error handling best practices. Refactored my error handling to reflect this and all code is passing.

Completed the following tasks:

> added update() method to the EventRepository in queries.events.py
> added update_event() method for @router.put fastAPI endpoint in routers.events.py
> merge request for put_events_dev branch approved and merged to main

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
