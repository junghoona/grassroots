import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AllEventAttendeesList = () => {
  const [attendees, setAttendees] = useState([]);
  const { event_id } = useParams();
  const [eventName, setEventName] = useState("");
  const navigate = useNavigate();

  const getAttendeesData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/attendees/${event_id}/details`
    );
    if (response.ok) {
      const data = await response.json();
      setAttendees(data);
    }
  };

  const getEventName = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/events/${event_id}`
    );
    if (response.ok) {
      const eventData = await response.json();
      setEventName(eventData.name);
    }
  };

  useEffect(() => {
    getEventName();
    getAttendeesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event_id]);

  const handleCardClick = (person) => {
    navigate(`/userprofile/${person}`);
  };

  return (
    <div className="text-center">
      <h1>{eventName}'s Attendees</h1>
      <div className="row">
        {attendees.map((attendee) => (
          <div className="col-md-3 mb-4" key={attendee.id}>
            <div
              className="card shadow rounded"
              style={{
                maxWidth: "300px",
                cursor: "pointer",
              }}
              onClick={() => handleCardClick(attendee.person)}
            >
              <div
                className="card-body"
                style={{
                  transition: "background-color 0.3s",
                }}
              >
                <h5 className="card-title">
                  {`${attendee.first_name} ${attendee.last_name}`}
                </h5>
              </div>
              <style>
                {`
                  .card:hover .card-body {
                    background-color: #98FB99;
                  }
                `}
              </style>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllEventAttendeesList;
