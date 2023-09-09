import { getCurrentUser } from "../UserProfilePage/UserProfilePage";
import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import VideoBackground from "./VideoBackground";

function Main() {
  const [userData, setUserData] = useState({});
  const { token } = useToken();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/events`
    );
    if (response.ok) {
      const data = await response.json();

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

  console.log("USER DATA: ", userData);

  return (
    <div>
      {token ? (
        <div className="main">
          <VideoBackground userName={userData} />
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
        <div className="main">
          <VideoBackground userName={null} />
        </div>
      )}
    </div>
  );
}
export default Main;
