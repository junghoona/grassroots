import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getCurrentUser } from "../UserProfilePage/UserProfilePage";
import useToken from "@galvanize-inc/jwtdown-for-react";

const EventDetails = () => {
  const [events, setEvents] = useState([]);
  const [userId, setUserId] = useState("");
  const { event_id } = useParams();
  const { token } = useToken();
  const navigate = useNavigate();

  const getEventDetailsData = async () => {
    const EventDetails = `${process.env.REACT_APP_API_HOST}/api/events/${event_id}`;
    const response = await fetch(EventDetails);
    if (response.ok) {
      const data = await response.json();
      setEvents(data);
    } else {
      console.log("Error!");
    }
  };

  const attendEventButton = () => {
    const attendEvent = `${process.env.REACT_APP_API_HOST}/api/attendees`;
    fetch(attendEvent, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event: event_id,
        person: userId,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        console.log("Success!!");
        navigate(`/attendees/${event_id}/details`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getEventDetailsData();
    if (token) {
      getCurrentUser().then((user) => setUserId(user.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="container text-center">
      <div className="row justify-content-center">
        <div className="col-md-8">
          {token ? (
            <div
              className="card mb-4"
              style={{ maxWidth: "800px" }}
              key={events.id}
            >
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={events.image}
                    className="img-fluid rounded-start"
                    alt="Event"
                    style={{ height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{events.name}</h5>
                    <p className="card-text">{events.description}</p>
                    <p className="card-text">{events.location}</p>
                    <p className="card-text">{events.city}</p>
                    <p className="card-text">{events.state}</p>
                    <p className="card-text">
                      {events.day} from {events.start_time} to {events.end_time}
                    </p>
                    <p className="card-text">
                      <small className="text-muted">
                        Event Type: {events.type}
                      </small>
                    </p>
                    <button
                      onClick={attendEventButton}
                      className="btn btn-primary"
                    >
                      Attend Event!
                    </button>
                    <Link
                      to={`/attendees/${event_id}/details`}
                      className="btn btn-primary"
                    >
                      Attendees List
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="card mb-4"
              style={{ maxWidth: "800px" }}
              key={events.id}
            >
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={events.image}
                    className="img-fluid rounded-start"
                    alt="Event"
                    style={{ height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{events.name}</h5>
                    <p className="card-text">{events.description}</p>
                    <p className="card-text">{events.location}</p>
                    <p className="card-text">{events.city}</p>
                    <p className="card-text">{events.state}</p>
                    <p className="card-text">
                      {events.day} from {events.start_time} to {events.end_time}
                    </p>
                    <p className="card-text">
                      <small className="text-muted">
                        Event Type: {events.type}
                      </small>
                    </p>
                    <Link
                      to={`/attendees/${event_id}/details`}
                      className="btn btn-primary"
                    >
                      Attendees List
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
