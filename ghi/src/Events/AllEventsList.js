import { useEffect, useState } from "react";

const AllEventList = () => {
  const [events, setEvents] = useState([]);

  const getAllEventsData = async () => {
    const allEventsData = "http://localhost:8000/api/events";
    const response = await fetch(allEventsData);
    if (response.ok) {
      const data = await response.json();
      setEvents(data);
    }
  };

  useEffect(() => {
    getAllEventsData();
  }, []);

  return (
    <div>
      {events.map((event) => (
        <div className="card mb-4" style={{ maxWidth: "800px" }} key={event.id}>
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
                <p className="card-text">{event.location}</p>
                <p className="card-text">
                  {event.day} from {event.start_time} to {event.end_time}
                </p>
                <p className="card-text">
                  <small className="text-muted">Creator: {event.creator}</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllEventList;
