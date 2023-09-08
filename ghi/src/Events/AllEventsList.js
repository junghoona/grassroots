import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllEventList = () => {
  const [events, setEvents] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");

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
  }, []);

  return (
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
              <option key={state.objectId} value={state.name.toLowerCase()}>
                {state.name}
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
            .filter((item) => {
              return (
                selectedState.toLowerCase() === "" ||
                item.event.state
                  .toLowerCase()
                  .includes(selectedState.toLowerCase())
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
                        {event.day} from {event.start_time} to {event.end_time}
                      </p>
                      <p className="card-text">
                        <small className="text-muted">
                          Creator: {event.creator}
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
  );
};

export default AllEventList;
