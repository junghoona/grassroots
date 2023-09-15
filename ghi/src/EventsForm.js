import { useState, useEffect, useRef } from "react";
import { getCurrentUser } from "./UserProfilePage/UserProfilePage";

export async function fetchStates() {
  const where = encodeURIComponent(
    JSON.stringify({
      name: {
        $exists: true,
      },
    })
  );
  const url = `${process.env.REACT_APP_STATE_API_URL}${where}`;
  const response = await fetch(url, {
    headers: {
      "X-Parse-Application-Id": `${process.env.REACT_APP_STATE_APPLICATION_ID}`,
      "X-Parse-REST-API-Key": `${process.env.REACT_APP_STATE_REST_API_KEY}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  throw Error(`Could not fetch states ${response}`);
}

async function makeCreatorAttendee(creatorId, eventId) {
  const url = `${process.env.REACT_APP_API_HOST}/api/attendees`;
  let data = {};
  data.person = creatorId;
  data.event = eventId;
  const response = await fetch(url, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw Error(`Could not make creator an attendee of the event ${response}`);
  }
}

function EventForm() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [states, setStates] = useState([]);
  const [state, setState] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [creator, setCreator] = useState("");
  const [communities, setCommunities] = useState([]);
  const [community, setCommunity] = useState("");
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [image, setImage] = useState("");
  const dateInputRef = useRef(null);

  async function fetchUserCommunities() {
    const url = `${process.env.REACT_APP_API_HOST}/api/communities/user/${creator}`;
    const response = await fetch(url, {
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw Error(`Could not fetch communities ${response}`);
  }

  useEffect(() => {
    fetchStates().then((data) => setStates(data["results"]));
    getCurrentUser().then((user) => setCreator(user.id));
    if (creator !== "") {
      fetchUserCommunities().then((data) => setCommunities(data.communities));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creator]);

  async function handleSubmit(event) {
    event.preventDefault();
    const eventData = {
      name: name,
      location: location,
      city: city,
      state: state,
      type: type,
      description: description,
      creator: creator,
      community: community,
      day: day,
      start_time: startTime,
      end_time: endTime,
      image: image,
    };
    const eventsUrl = `${process.env.REACT_APP_API_HOST}/api/events`;
    const eventConfig = {
      method: "post",
      credentials: "include",
      body: JSON.stringify(eventData),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(eventsUrl, eventConfig);
    if (response.ok) {
      let createdEvent = await response.json();
      makeCreatorAttendee(creator, createdEvent.id);
      setName("");
      setLocation("");
      setCity("");
      setState("");
      setType("");
      setDescription("");
      setCommunity("");
      setDay("");
      setStartTime("");
      setEndTime("");
      setImage("");
      alert("Success!");
    }
    if (!response.ok) {
      console.log("Could not create Event:", response);
    }
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new Event</h1>
          <form onSubmit={handleSubmit} id="create-event-form">
            <div className="form-floating mb-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name of Event"
                required
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
              <label htmlFor="name">Title</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="ie Civic Center..."
                required
                type="text"
                name="location"
                id="location"
                className="form-control"
              />
              <label htmlFor="location">Location</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="ie Roseville..."
                required
                type="text"
                name="city"
                id="city"
                className="form-control"
              />
              <label htmlFor="last_name">City</label>
            </div>
            <label htmlFor="state" className="form-label">
              State
            </label>
            <div className="form-floating mb-3">
              <select
                onChange={(e) => setState(e.target.value)}
                required
                className="form-select"
                id="state"
                aria-label="Select a State"
              >
                <option value="">Select a State</option>
                {states.map((state) => {
                  return (
                    <option
                      key={state.objectId}
                      value={state.postalAbbreviation}
                    >
                      {state.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-floating mb-3">
              <select
                onChange={(e) => setType(e.target.value)}
                required
                id="type"
                className="form-select"
                aria-label="Select an event type"
              >
              <option value="">Select a Type</option>
              <option value="Fundraising">Fundraising</option>
              <option value="Protesting">Protesting</option>
              <option value="Educational">Educational</option>
              <option value="Educational">Community in Action</option>
              </select>
            </div>
            <div className="form-floating mb-3">
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="ie Those who pick up trash together, picnic together..."
                type="text"
                name="description"
                id="description"
                className="form-control"
              />
              <label htmlFor="description">Event Description</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="ie a link to a related picture..."
                type="text"
                name="image"
                id="image"
                className="form-control"
              />
              <label htmlFor="image">Event Image</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={creator}
                required
                type="hidden"
                name="creator"
                id="creator"
              />
            </div>
            <label htmlFor="community" className="form-label">
              Community Hosting the Event
            </label>
            <div className="form-floating mb-3">
              <select
                onChange={(e) => setCommunity(e.target.value)}
                required
                className="form-select"
                id="community"
                aria-label="Select a Community"
              >
                <option value="">Select a Community</option>
                {communities.map((community) => {
                  return (
                    <option key={community.id} value={community.id}>
                      {community.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-floating mb-3">
              <input
                value={day}
                onChange={(e) => setDay(e.target.value)}
                ref={dateInputRef}
                placeholder="ie Tuesday"
                required
                type="date"
                name="day"
                id="day"
                className="form-control"
              />
              <label htmlFor="day">{day}</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                placeholder="ie 3pm"
                required
                type="time"
                name="start_time"
                id="start_time"
                className="form-control"
              />
              <label htmlFor="start_time">Start Time</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                placeholder="ie 5pm"
                required
                type="time"
                name="end_time"
                id="end_time"
                className="form-control"
              />
              <label htmlFor="end_time">End Time</label>
            </div>
            <button disabled={states.length === 0} className="btn btn-primary">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EventForm;
