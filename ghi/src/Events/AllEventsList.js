import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

const AllEventList = () => {
  const [events, setEvents] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedEventType, setSelectedEventType] = useState("");
  const { token } = useToken();

  async function getAllEventsData() {
    const url = `${process.env.REACT_APP_API_HOST}/api/events`;
    const response = await fetch(url, {});
    if (response.ok) {
      const data = await response.json();
      setEvents(data);
    } else {
      console.log("Error!");
    }
  }
  async function fetchStatesAPI() {
    const where = encodeURIComponent(
      JSON.stringify({
        name: {
          $exists: true,
        },
      })
    );

    try {
      const response = await fetch(
        `${process.env.REACT_APP_STATE_API_URL}${where}`,
        {
          headers: {
            "X-Parse-Application-Id": `${process.env.REACT_APP_STATE_APPLICATION_ID}`,
            "X-Parse-REST-API-Key": `${process.env.REACT_APP_STATE_REST_API_KEY}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Response error: " + response.status);
      } else {
        const data = await response.json();
        setStates(data["results"]);
      }
    } catch (error) {
      console.error("Fetched error:", error);
    }
  }

  useEffect(() => {
    getAllEventsData();
    fetchStatesAPI();
  }, [token]);

  return (
    <div>
      {token ? (
        <div className="container text-center">
          <header className="d-flex justify-content-between align-items-center p-2">
            <h1 className="mt-5">Upcoming Events</h1>
            <div className="input-group mt-4 p-2">
              <select
                className="form-select"
                onChange={(e) => setSelectedState(e.target.value)}
                value={selectedState}
              >
                <option value="">All States</option>
                {states.map((state) => (
                  <option key={state.objectId} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </select>
              <select
                className="form-select"
                onChange={(e) => setSelectedEventType(e.target.value)}
                value={selectedEventType}
              >
                <option value="">All Event Types</option>
                {events.map((event) => (
                  <option key={event.id} value={event.type}>
                    {event.type}
                  </option>
                ))}
              </select>
            </div>
            <Link
              to={`/events/create`}
              className="btn btn-success btn-block mt-4 p-2 ml-auto"
              style={{ width: "150px" }}
            >
              Create Event
            </Link>
          </header>
          <main>
            <div className="row justify-content-center">
              {events
                .filter((event) => {
                  return (
                    (selectedState === "" ||
                      event.state.includes(selectedState)) &&
                    (selectedEventType === "" ||
                      event.type === selectedEventType)
                  );
                })
                .map((event) => (
                  <div
                    className="card mb-4 shadow-lg bg-light"
                    style={{ maxWidth: "800px" }}
                    key={event.id}
                  >
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={event.image}
                          className="img-fluid rounded-start"
                          alt="Event"
                          style={{ height: "100%", objectFit: "cover" }}
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{event.name}</h5>
                          <p className="card-text">{event.description}</p>
                          <p className="card-text">{event.state}</p>
                          <p className="card-text">
                            {event.day} from {event.start_time} to{" "}
                            {event.end_time}
                          </p>
                          <p className="card-text">
                            <small className="text-muted">
                              Event Type: {event.type}
                            </small>
                          </p>
                          <Link
                            to={`/events/${event.id}`}
                            className="btn btn-primary"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </main>
        </div>
      ) : (
        <div className="container text-center">
          <header className="d-flex justify-content-between align-items-center p-2">
            <h1 className="mt-5">Upcoming Events</h1>
            <div className="input-group mt-4 p-2">
              <select
                className="form-select"
                onChange={(e) => setSelectedState(e.target.value)}
                value={selectedState}
              >
                <option value="">All States</option>
                {states.map((state) => (
                  <option key={state.objectId} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </select>
              <select
                className="form-select"
                onChange={(e) => setSelectedEventType(e.target.value)}
                value={selectedEventType}
              >
                <option value="">All Event Types</option>
                {events.map((event) => (
                  <option key={event.id} value={event.type}>
                    {event.type}
                  </option>
                ))}
              </select>
            </div>
          </header>
          <main>
            <div className="row justify-content-center">
              {events
                .filter((event) => {
                  return (
                    (selectedState === "" ||
                      event.state.includes(selectedState)) &&
                    (selectedEventType === "" ||
                      event.type === selectedEventType)
                  );
                })
                .map((event) => (
                  <div
                    className="card mb-4 shadow-lg bg-light"
                    style={{ maxWidth: "800px" }}
                    key={event.id}
                  >
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={event.image}
                          className="img-fluid rounded-start"
                          alt="Event"
                          style={{ height: "100%", objectFit: "cover" }}
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src =
                              "https://images.pexels.com/photos/5408818/pexels-photo-5408818.jpeg?auto=compress&cs=tinysrgb&w=600";
                          }}
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{event.name}</h5>
                          <p className="card-text">{event.description}</p>
                          <p className="card-text">{event.state}</p>
                          <p className="card-text">
                            {event.day} from {event.start_time} to{" "}
                            {event.end_time}
                          </p>
                          <p className="card-text">
                            <small className="text-muted">
                              Event Type: {event.type}
                            </small>
                          </p>
                          <Link
                            to={`/events/${event.id}`}
                            className="btn btn-primary"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </main>
        </div>
      )}
    </div>
  );
};

export default AllEventList;
