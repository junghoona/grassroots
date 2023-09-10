import { Link, NavLink, useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

const Navbar = () => {
  const { token, logout } = useToken();
  const navigate = useNavigate();

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "#98FB98" }}
    >
      <div className="container-fluid">
        <NavLink className="navbar-brand" to={`${process.env.PUBLIC_URL}`}>
          Green Bean
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-expanded="false"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse d-flex justify-content-around"
          id="navbarScroll"
        >
          <ul className="navbar-nav">
            <li className="nav-item px-3">
              <NavLink
                className="nav-link"
                aria-current="page"
                to={`${process.env.PUBLIC_URL}/about`}
              >
                About
              </NavLink>
            </li>
            <li className="nav-item dropdown px-3">
              <Link
                className="nav-link dropdown-toggle"
                to={`${process.env.PUBLIC_URL}/communities`}
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Communities
              </Link>
              <ul className="dropdown-menu">
                {token && (
                  <li>
                    <Link className="dropdown-item" to={`/communities/create`}>
                      Create a Community
                    </Link>
                  </li>
                )}
                {token && (
                  <li>
                    <Link className="dropdown-item" to={`/usercommunities`}>
                      My Communities
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    className="dropdown-item"
                    to={`${process.env.PUBLIC_URL}/communities`}
                  >
                    View All Communities
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown px-3">
              <Link
                className="nav-link dropdown-toggle"
                to={`${process.env.PUBLIC_URL}/events/all`}
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Events
              </Link>
              <ul className="dropdown-menu">
                {token && (
                  <li>
                    <Link
                      className="dropdown-item"
                      to={`${process.env.PUBLIC_URL}/events/create`}
                    >
                      Create an Event
                    </Link>
                  </li>
                )}
                {token && (
                  <li>
                    <Link
                      className="dropdown-item"
                      to={`${process.env.PUBLIC_URL}/userevents`}
                    >
                      My Events
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    className="dropdown-item"
                    to={`${process.env.PUBLIC_URL}/events/all`}
                  >
                    Upcoming Events
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown px-3">
              <Link
                className="nav-link dropdown-toggle"
                to={`${process.env.PUBLIC_URL}/userprofile`}
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Account
              </Link>
              <ul className="dropdown-menu">
                {token && (
                  <li>
                    <Link
                      className="dropdown-item"
                      to={`${process.env.PUBLIC_URL}/userprofile`}
                    >
                      My Profile
                    </Link>
                  </li>
                )}
                {!token && (
                  <li>
                    <Link
                      className="dropdown-item"
                      to={`${process.env.PUBLIC_URL}/signup`}
                    >
                      Create an account
                    </Link>
                  </li>
                )}
              </ul>
            </li>
            {!token && (
              <button
                className="btn btn-outline-success"
                onClick={() => {
                  return navigate(`login`);
                }}
              >
                Log In
              </button>
            )}
            {token && (
              <button
                className="btn btn-outline-danger"
                onClick={() =>
                  logout().then(() => {
                    return navigate(`/`);
                  })
                }
              >
                Log Out
              </button>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
