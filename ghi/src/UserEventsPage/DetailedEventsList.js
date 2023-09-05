import React, { useState, useEffect } from "react";

function DetailedEventsList(props) {
  const [events, setEvents] = useState([]);

  async function getAllCommunities() {
    const url = `${process.env.REACT_APP_API_HOST}/api/events/user/${props.user.id}`;
    const response = await fetch(url, {
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      setEvents(data);
    } else {
      console.log("Failed to fetch data!");
    }
  }

  useEffect(() => {
    if (props.user.id !== undefined) {
      getAllCommunities();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.user]);

  return (
    <div className="col" style={{ width: "100%" }}>
      <h4 className="mt-3">My Events:</h4>
      <div className="d-flex">
        <div>
          {events.map((event) => {
            return (
              <div className="card m-2" key={event.id}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain1.webp"
                      className="img-fluid rounded-start"
                      alt="event"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{event.name}</h5>
                      <p className="card-text">{event.description}</p>
                      <div className="card-text">
                        <div>
                          <small className="text-muted">
                            Date: {event.day}
                          </small>
                        </div>
                        <div>
                          <small className="text-muted">
                            Time: {event.start_time} to {event.end_time}
                          </small>
                        </div>
                        <div>
                          <small className="text-muted">
                            Location: {event.location}
                          </small>
                        </div>
                        <div>
                          <small className="text-muted">
                            {event.city}, {event.state}
                          </small>
                        </div>
                      </div>
                      <div>
                        <button type="button" className="btn btn-primary">
                          Leave
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DetailedEventsList;