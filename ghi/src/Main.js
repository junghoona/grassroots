import { getCurrentUser } from "./UserProfilePage/UserProfilePage";
import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { Navigate, useNavigate } from "react-router-dom";
import { Redirect } from "react-router";
import Button from "react-bootstrap/Button";
import videoBg from "./Assets/videoBg.mp4";
import Spinner from "react-bootstrap/Spinner";

function Main() {
  const [userData, setUserData] = useState({});
  const { token } = useToken();
  const navigate = useNavigate();
  const backgroundColor = `rgba(0, 0, 0, 0.5)`;
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/events`
    );
    if (response.ok) {
      const data = await response.json();
      console.log("EVENTS: ", data);
      setEvents(data);
    } else {
      console.error(response);
    }
  };

  useEffect(() => {
    if (token) {
      getCurrentUser().then((user) => setUserData(user));
      getEvents();
    }
  }, [token]);

  return (
    <div>
      {token ? (
        <div className="main" style={{ width: 100 + "%", height: 100 + "vh" }}>
          <div
            className="bg-overlay"
            style={{
              height: 100 + "%",
              width: 100 + "%",
              backgroundColor: { backgroundColor },
            }}
          >
            <div
              className="content"
              style={{
                position: "absolute",
                display: "center",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <h1>
                Welcome, {userData.first_name} {userData.last_name}!
              </h1>
            </div>
            <video
              src={videoBg}
              autoPlay
              loop
              muted
              style={{
                width: 100 + "%",
                height: 100 + "vh",
                objectFit: "cover",
              }}
            />
          </div>
          <div className="container-fluid">
            <h2>Events near {userData.city} </h2>
            {events
              .filter((event) => {
                return event.city === userData.city;
              })
              .map((event) => {
                return (
                  <div
                    key={event.id}
                    className="col-md-4 col-sm-6 card my-3 py-3 shadow"
                  >
                    <div className="card-body">
                      <h5 className="card-title fw-bold fs-4">{event.name}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {event.city}, {event.state}
                      </h6>
                    </div>
                    <div className="card-footer">
                      <button
                        onClick={() =>
                          navigate(
                            `${process.env.PUBLIC_URL}/events/${event.id}`
                          )
                        }
                        type="button"
                        className="btn btn-sm"
                      >
                        Find out more
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <div>
          <div
            className="main"
            style={{ width: 100 + "%", height: 100 + "vh" }}
          >
            <div
              className="bg-overlay"
              style={{
                height: 100 + "%",
                width: 100 + "%",
                backgroundColor: { backgroundColor },
              }}
            >
              <div
                className="content"
                style={{
                  position: "absolute",
                  display: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <h1>Welcome!</h1>
              </div>
              <video
                src={videoBg}
                autoPlay
                loop
                muted
                style={{
                  width: 100 + "%",
                  height: 100 + "vh",
                  objectFit: "cover",
                }}
              />
            </div>
            <Button onClick={() => navigate(`${process.env.PUBLIC_URL}/login`)}>
              Log In
            </Button>
            <Button
              onClick={() => navigate(`${process.env.PUBLIC_URL}/signup`)}
            >
              Create an account
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
export default Main;
