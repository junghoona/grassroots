### Project Green Bean

- Megan Stewart
- Parsa Abdizadeh
- Long Guan
- John An

Project Green Bean is a community connection platform empowering communities with hope for a more sustainable and connected future by easily connecting community members with a network of local environemntal grassroots organizations and action oriented events

### Design

- [API Design](./API_DESIGN.MD)
- [Data Model](./DATA_MODEL.MD)
- [GHI](./GHI.MD)
- [Integrations](./INTEGRATIONS.MD)

### Functionality

- Visitors to our site can view our mission and about pages and see local communities and upcoming events filtered by location
- Visitors can become participants by creating an account
- Users can share about themselves on their own user profile page when logged in. Users can upload a profile picture, edit their about me text field, and change their location
- Users can browse communities and filter communities based on location
- Users can become a community member by joining a community and view the communities they have joined on a dedicated page from the navbar or as a section on their profile page
- Users can browse events of communities and filter events by location
- Users can attend events and leave events if needed
- Users can start their own community organization with a title and theme
- Users can create an event for a community they are members of
- Main page features a personalized greeting and displays upcoming events nearby the user's location

### Future Functionality

- Main page features a display image and information on endangered species sightings nearby the user (based on US state location)
- Events are filtered by community
- Events can be marked a success and written reviews and ratings can be posted by attendees
- Community creators can edit and update the community profile page
- Communities can display celebrations in the form of posts to their profile page

### Project Initialization

#### To Run Locally:
1. Clone the project repository down to your local machine
2. CD into the project directory
3. Run docker volume create postgres-data
4. Run docker-compose build
5. Run docker-compose up
6. visit localhost:3000/

#### To View Deployed App
1. visit our public URL: https://good-coders.gitlab.io/module3-project-gamma/
