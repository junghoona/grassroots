import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import Main from "./Mainpage/Main";
import EventDetails from "./Events/EventDetails";
import AllEventList from "./Events/AllEventsList";
import "./App.css";
import CommunitiesList from "./Communities/CommunitiesList";
import CommunitiesForm from "./Communities/CommunitiesForm";
import Navbar from "./Navbar";
import UserProfilePage from "./UserProfilePage/UserProfilePage";
import EventForm from "./EventsForm";
import CommunityProfile from "./Communities/CommunityProfile";
import AllEventAttendeesList from "./Events/EventAttendeesList";
import MembersList from "./MembersList";
import UserEventsPage from "./UserEventsPage/UserEventsPage";
import AboutPage from "./AboutPage/AboutPage";
import UserCommunitiesPage from "./UserCommunitiesPage/UserCommunitiesPage";
import IndividualProfilePage from "./IndividualUserPage/IndividualProfilePage";

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");

  const backgroundColor = {
    backgroundColor: "#f3f2f2",
  };

  return (
    <div>
      <BrowserRouter basename={basename}>
        <AuthProvider baseUrl={process.env.REACT_APP_API_HOST}>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Main />}></Route>
            <Route exact path="/signup" element={<SignupForm />}></Route>
            <Route exact path="/login" element={<LoginForm />}></Route>
            <Route
              exact
              path="/userprofile"
              element={<UserProfilePage />}
            ></Route>
            <Route path="communities/">
              <Route path="create" element={<CommunitiesForm />} />
              <Route index element={<CommunitiesList />} />
              <Route path=":community_id" element={<CommunityProfile />} />
            </Route>
            <Route
              exact
              path="/userevents"
              element={<UserEventsPage />}
            ></Route>
            <Route exact path="/about" element={<AboutPage />}></Route>
            <Route
              exact
              path="/usercommunities"
              element={<UserCommunitiesPage />}
            ></Route>
            <Route path="events/">
              <Route path="all" element={<AllEventList />} />
              <Route path="create" element={<EventForm />} />
              <Route path=":event_id" element={<EventDetails />}></Route>
            </Route>
            <Route
              exact
              path="/attendees/:event_id/details"
              element={<AllEventAttendeesList />}
            ></Route>
            <Route
              exact
              path="/userprofile"
              element={<UserProfilePage />}
            ></Route>
            <Route
              exact
              path="/members/:community_id/"
              element={<MembersList />}
            ></Route>
            <Route
              path="/userprofile/:userId"
              element={<IndividualProfilePage />}
            ></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
