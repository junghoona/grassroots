import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import Main from "./Main";
import EventDetails from "./Events/EventDetails";
import "./App.css";
import CommunitiesList from "./CommunitiesList";
import CommunitiesForm from "./CommunitiesForm";
import Navbar from "./Navbar";
import UserProfilePage from "./UserProfilePage/UserProfilePage";
import EventForm from "./EventsForm";
import AllEventAttendeesList from "./Events/EventAttendeesList";
import UserEventsPage from "./UserEventsPage/UserEventsPage";
import AboutPage from "./AboutPage/AboutPage";
import UserCommunitiesPage from "./UserCommunitiesPage/UserCommunitiesPage";

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");

  return (
    <div>
      <BrowserRouter basename={basename}>
        <AuthProvider baseUrl={process.env.REACT_APP_API_HOST}>
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Main />}></Route>
              <Route exact path="/signup" element={<SignupForm />}></Route>
              <Route exact path="/login" element={<LoginForm />}></Route>
              <Route exact path="/logout" element={<LogoutButton />}></Route>
              <Route
                exact
                path="/userprofile"
                element={<UserProfilePage />}
              ></Route>
              <Route path="communities/">
                <Route path="create" element={<CommunitiesForm />} />
                <Route index element={<CommunitiesList />} />
              </Route>
              <Route
                exact
                path="/userprofile"
                element={<UserProfilePage />}
              ></Route>
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
                <Route path="create" element={<EventForm />} />
                <Route path=":event_id" element={<EventDetails />}></Route>
              </Route>
              <Route
                exact
                path="/attendees/:event_id/details"
                element={<AllEventAttendeesList />}
              ></Route>
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
