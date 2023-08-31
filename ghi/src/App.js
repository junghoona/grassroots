import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import Main from "./Main";
import LogoutButton from "./Logout";
import "./App.css";
import UserProfilePage from "./UserProfilePage/UserProfilePage";
// import CommunitiesList from "./CommunitiesList";
import CommunitiesForm from "./CommunitiesForm";

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");

  return (
    <div className="container">
      <AuthProvider baseUrl={process.env.REACT_APP_API_HOST}>
        <BrowserRouter basename={basename}>
          <Routes>
            <Route exact path="/" element={<Main />}></Route>
            <Route exact path="/signup" element={<SignupForm />}></Route>
            <Route exact path="/login" element={<LoginForm />}></Route>
            <Route exact path="/logout" element={<LogoutButton />}></Route>
            <Route path="communities/">
              <Route path="create" element={<CommunitiesForm />} />
              {/* <Route index element={<CommunitiesList />} /> */}
            </Route>
            <Route
              exact
              path="/userprofile"
              element={<UserProfilePage />}
            ></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
