### Friday Sept 8, 2023

We are in the final hours of this project. We did a final application audit and made a list of priority to-dos before grading and a list of non-priority to-dos during stretch goal week. I finished up some final details, added a link to the user-profile of a member of a community, clickable via the members list on the community profile page. I added a success Alert message on the event form submission when resetting the form in the if response.ok block. This adds a success alert pop up. With more time on stretch goal week I would like to update this and use bootstrap to render a success message block to the page rather than an alert pop up. I also rendered a join community button to the community profile page. This was in tandem with John's join community button functionality. During the planning of this project we divided backend and frontend work evenly and put our names on the features we were responsible for. I am realizing that some more strategey would have been better here, since I worked on the frontend of the community profile page, John was dependent on that feature branch in order to work on the join button functionality. We ended up collaborating on the button async. When I merged John's button functionality and tried to render it to the community profile page it was not updating the text of the button correctly nor was the member (which had been successfully posted) being rendered to the list without a hard refresh on the page.

To remedey this I had to reconcile the useStates in CommunityJoin.js and CommunityProfile.js. I refactored the button functionality to exist in CommunityProfile.js and removed CommunityJoin.js file as it was not needed elsewhere. I added John's JoinCommunity function and handleClick funtion to CommunityProfile.js Then I updated the useEffect with a Promise on getCurrentUser and fetchMembers to setMembers list to the updated members list AND to setUser to the userData from getCurrentUser, then I checked if the user id matched the member id before setClicked state on button to true so that the button text state reflects the current user's member status on the community even after leaving the page. 

### Thursday Sept 7, 2023

Today I worked on finishing the members list page and the community profile page. I need to render the components I fetched for the page: members of a community list, events of a community list, community title and description. I am feeling overwhelmed by bootstrap of all things. I rendered these elements but did zero styling. At this point in the project I am aiming for functional MVP and will spend time after submission during stretch goal week to add nicer styling to the page. I feel like I may even enjoy it more without the pressure of a deadline looming.

UPDATE | I recalled that I had made edits to the community profile page on a different dev branch: dev-members-list. This is what I had worked on on Tuesday when I forgot to journal. Due to this forgetfulness I ended up writing the jsx rendering of the community profile page on the dev-community-profile branch (the one that did not have a separate memberlist.js file and which included all the fetch functions within the CommunityProfile funtion on the CommunityProfile.js page). I decided that I wanted the nicer, refactored version of CommunityProfile.js from the dev-members-list branch but with all the jsx rendering I worked on today from the dev-community-profile branch. So I ended up needing to checkout into a new dev-members-list-edits branch to do a side by side review and copy paste of the CommunityProfile.js from the dev-community-profile branch to the CommunityProfile.js on the dev-members-list branch.

While doing this edit I rebased with the latest changes from main. Those changes included changes to migrations and some broken functionality. I fixed the broken import by refactoring the function it was referencing to the global state. I then removed and rebuilt my volume and containers to test my dev-members-list-edits. All is working. I pushed to remote and created a merge request.

Realizing that through the stress of this project I forgot some basic principles. ALWAYS commit working code on specific changes. IE commit working code often and commit work one segment at a time. If I make working changes on one functionality on a branch COMMIT it before working on a different functionality on the branch so that my commits are clear and organized and articulated. This will help out everyone if any errors come up or if any of those features need to be undone.

### Wednesday Sept 6, 2023

Today we worked on backend and frontend deployment as a team. This was a doozy. I think my brain is fried bc it was challenging to follow along to the deployment steps. This is definitely due to a lack of sleep because after the mess of deployment today I was able to articulate some helpful direction for another teammate also feeling confused by this process. We were able to get our backend and frontend deployed however our 3rd party apis are no longer working on our public url. In order to prepare for deployment we refactored all of our urls to be dynamic and not hard-coded. In doing so our 3rd party api for states is no longer working deployment-side. They are still working locally. This may be a blocker tomorrow.

### Tuesday Sept 5, 2023

Today was the module 3 practice test. This afternoon I attempted to complete my community profile details...I forgot to journal and within the last 24 hours cannot recall what was accomplished. Lots of troubleshooting, some merge request reviews, some pipeline fixes.

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

Since I already wrote my community react hooks and setCommunity state on a fetch a specific community function in the community profile file, I imported the fetchCommunity function as a component and passed community_id into my aysnc fetch members function as a parameter, then added fetchCommunity to my useEffect and utilized .then method to set community to data response. I also made sure to write the fetch members function globally so that I could export it and use it in my community profile page much the same way. I then wrote a simple list rendering on the members list page and then finished working on community profile page by importing the fetchMembers function as a component and setting members and community within the useEffect call on fetchCommunity and fetchMembers by using the .then method and writing an arrow function to handle setting the data to the react hook states for each. Each page shares the same compnents almost but will be rendering a different interface. For now the pages are functional but very bare bones visually. I will  need to explore more bootstrap to add more elements to render on the profile page and maybe add a bit more elegance to the simple members list page.

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
