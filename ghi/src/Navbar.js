import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="http://localhost:3000/">
          Green Bean
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
            <li className="nav-item px-3">
              <NavLink
                className="nav-link active"
                aria-current="page"
                to={`${process.env.PUBLIC_URL}/about`}
              >
                About
              </NavLink>
            </li>
            <li className="nav-item dropdown px-3">
              <NavLink
                className="nav-link dropdown-toggle"
                to="http://localhost:3000/communities"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Communities
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="http://localhost:3000/communities/create"
                  >
                    Create a Community
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    to={`${process.env.PUBLIC_URL}/usercommunities`}
                  >
                    My Communities
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="http://localhost:3000/communities"
                  >
                    View All Communities
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown px-3">
              <NavLink
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Events
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" href="#">
                    Create an Event
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    to={`${process.env.PUBLIC_URL}/userevents`}
                  >
                    My Events
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" href="#">
                    Upcoming Events
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown px-3">
              <NavLink
                className="nav-link dropdown-toggle"
                to="http://localhost:3000/communities"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Account
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <NavLink
                    className="dropdown-item"
                    to={`${process.env.PUBLIC_URL}/userprofile`}
                  >
                    My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="http://localhost:3000/signup"
                  >
                    Create an account
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="http://localhost:3000/login"
                  >
                    Log in
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="http://localhost:3000/logout"
                  >
                    Log out
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
