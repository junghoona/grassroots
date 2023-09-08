import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AllEventAttendeesList = () => {
  const [attendees, setAttendees] = useState([]);
  const { event_id } = useParams();

  const getAttendeesData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/attendees/${event_id}/details`
    );
    if (response.ok) {
      const data = await response.json();
      setAttendees(data);
    }
  };

  useEffect(() => {
    getAttendeesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event_id]);

  return (
    <div>
      {attendees.map((attendee) => (
        <div
          className="card mb-4"
          style={{ maxWidth: "800px" }}
          key={attendee.id}
        >
          <div className="row g-0">
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{`${attendee.first_name} ${attendee.last_name}`}</h5>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllEventAttendeesList;
