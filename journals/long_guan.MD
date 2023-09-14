### Monday Aug 22, 2023

Added endpoint to get a list of members in a specific community - Added endpoint to get a list of all members

### Tuesday Aug 22, 2023

Worked on backend authorization by myself to learn

### Wednesday Aug 22, 2023

I got backend authorization working. Then we mobbed programmed backend authorization together.

### Tuesday Aug 22, 2023

I added a navbar filtering system using the token and created a merge request and merged it into main.

### Tuesday Aug 30, 2023

I worked on individual components. It's fun learning and using React again. I had to spend time reviewing how React works but got going pretty quick

### Tuesday Sept 5, 2023

Deployment is super frustrating as there are no errors that print out. It either works or it doesn't and it's hard to figure out what we did wrong.

### Thursday Sept 7, 2023

I realized that the account info given from the token endpoint is only the account info that's set during the login. The token encodes the account info so even when the account info gets updated in the database, the token still gives back account info that was encoded during the login. This was an issue since I was using the token to get updated account info after I send a PUT request so I could display the new changes. To resolve this, I added an endpoint in the backend to get account information and only relied on the token to get the account ID since the ID never changes.

### Friday Sept 8, 2023

We reviewed the project together as a team and wrote down issues that need to be fixed. Then we worked async to get the fixes done.

### Saturday Sept 9, 2023

I added two more unit tests for test_members. I totally forgot how unit tests worked and had to spend time reviewing. Looking forward to wrapping this project up. I also double checked the rubric to make sure I hit everything.
