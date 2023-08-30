import { useEffect, useState } from "react";

const EventDetails = () => {
  const [events, setEvents] = useState([]);

  const getEventDetailsData = async (id) => {
    const EventDetails = `${process.env.REACT_APP_API_HOST}/api/events/${id}`;
    console.log(EventDetails);
    const response = await fetch(EventDetails);
    if (response.ok) {
      const data = await response.json();
      setEvents(data);
    } else {
      console.log("OOOPS!");
    }
  };

  useEffect(() => {
    getEventDetailsData();
  }, []);

  return (
    <div>
      <div className="card mb-4" style={{ maxWidth: "800px" }} key={events.id}>
        <div className="row g-0">
          <div className="col-md-4">
            {/* <img
              src={events.image}
              className="img-fluid rounded-start"
              alt="Event"
              style={{ height: "100%", objectFit: "cover" }}
            /> */}
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{events.name}</h5>
              <p className="card-text">{events.description}</p>
              <p className="card-text">{events.location}</p>
              <p className="card-text">{events.city}</p>
              <p className="card-text">{events.state}</p>
              <p className="card-text">{events.type}</p>
              <p className="card-text">
                {events.day} from {events.start_time} to {events.end_time}
              </p>
              <p className="card-text">
                <small className="text-muted">Creator: {events.creator}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
