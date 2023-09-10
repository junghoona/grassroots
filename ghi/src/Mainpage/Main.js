import { getCurrentUser } from "../UserProfilePage/UserProfilePage";
import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import VideoBackground from "./VideoBackground";
import Carousel from "react-bootstrap/Carousel";

function Main() {
  const [userData, setUserData] = useState({});
  const { token } = useToken();
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/events`
    );
    if (response.ok) {
      const data = await response.json();

      setEvents(data);
    } else {
      console.error(response);
    }
  };

  useEffect(() => {
    if (token) {
      getCurrentUser().then((user) => setUserData(user));
      getEvents();
    }
  }, [token]);

  return (
    <div>
      {token ? (
        <div className="main">
          <VideoBackground />
          <div className="container-fluid">
            <h2>Events near {userData.city} </h2>
            <Carousel>
              {events
                .filter((event) => {
                  return event.city === userData.city;
                })
                .map((event) => {
                  return (
                    <Carousel.Item key={event.id}>
                      <img
                        className="d-block w-100"
                        src={event.image}
                        style={{ height: 50 + "rem" }}
                      />
                      <Carousel.Caption>
                        <h3>{event.name}</h3>
                        <p>
                          {event.city}, {event.state} <br />
                          {event.description} <br />
                          {event.day} {event.start_time} - {event.end_time}
                        </p>
                      </Carousel.Caption>
                    </Carousel.Item>
                  );
                })}
            </Carousel>
          </div>
        </div>
      ) : (
        <div className="main">
          <VideoBackground />
        </div>
      )}
    </div>
  );
}
export default Main;
