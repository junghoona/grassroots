import React, { useState, useEffect } from "react";

function EventsList(props) {
  const [events, setEvents] = useState([]);

  async function getAllCommunities() {
    const url = `${process.env.REACT_APP_API_HOST}/api/events`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setEvents(data);
    } else {
      console.log("Failed to fetch data!");
    }
  }

  useEffect(() => {
    getAllCommunities();
  }, []);

  return (
    <div
      className="card"
      style={{ maxWidth: "400px", backgroundColor: "#f8f9fa" }}
    >
      <h4 className="mt-3">My Events:</h4>
      {events.map((event) => {
        return (
          <div className="d-flex" key={event.id}>
            <div className="overflow-auto" style={{ height: "200px" }}>
              <div className="card m-2">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain1.webp"
                      className="img-fluid rounded-start"
                      alt="event"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{event.name}</h5>
                      <p className="card-text">{event.location}</p>
                      <p className="card-text">
                        <small className="text-muted">
                          {event.city}, {event.state}
                        </small>
                      </p>
                      <p className="card-text">
                        <small className="text-muted">
                          {event.start_time} to {event.end_time}
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default EventsList;
