import { getCurrentUser } from "../UserProfilePage/UserProfilePage";
import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import VideoBackground from "./VideoBackground";
import Carousel from "react-bootstrap/Carousel";
import { BsCalendarCheck, BsGeoAlt, BsTextParagraph } from "react-icons/bs";

function Main() {
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState({});
  const { token } = useToken();
  const [events, setEvents] = useState([]);

  const headerStyle = {
    marginTop: "25px",
    fontSize: "40px",
    fontStyle: "bold",
    fontFamily: "Georgia",
  };

  const textStyle = {
    fontSize: "15px",
    fontStyle: "bold",
    marginTop: "25px",
    marginBottom: "5px",
  };

  const imgStyle = {
    height: "50rem",
    width: "auto",
  };

  const captionHeader = {
    fontSize: "35px",
  };

  const captionStyle = {
    fontFamily: "Georgia",
  };

  useEffect(() => {
    if (token) {
      getCurrentUser()
        .then((data) => setUser(data))
        .then((user) => getUserData());
      getEvents();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, user]);

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

  async function getUserData() {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/user/${user.id}`,
      {
        credentials: "include",
      }
    );
    if (response.ok) {
      const data = await response.json();
      setUserData(data);
    } else {
      console.error(response);
    }
  }

  return (
    <div>
      {token ? (
        <div className="main">
          <VideoBackground />
          <div className="container-fluid mt-2">
            <div className="d-flex justify-content-between">
              <h2 style={headerStyle}>Events near {userData.city} </h2>
              <a href={process.env.PUBLIC_URL + "/events/all"}>
                <h2 className="btn btn-outline-info" style={textStyle}>
                  View all Events
                </h2>
              </a>
            </div>
            <div className="d-flex justify-content-center mt-2">
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
                          style={imgStyle}
                          alt="event"
                        />
                        <Carousel.Caption>
                          <div
                            className="bg-light bg-opacity-50 p-3 text-dark rounded"
                            style={captionStyle}
                          >
                            <a
                              href={
                                process.env.PUBLIC_URL + `/events/${event.id}`
                              }
                            >
                              <h3 style={captionHeader}>{event.name}</h3>
                            </a>
                            <div className="d-flex mt-2 align-items-center flex-column">
                              <div className="d-flex gap-2 mb-3">
                                <div>
                                  <BsGeoAlt />
                                </div>
                                {event.city}, {event.state}
                              </div>
                              <div className="d-flex gap-2 mb-3">
                                <div>
                                  <BsTextParagraph />
                                </div>
                                {event.description}
                              </div>
                              <div className="d-flex gap-2 mb-3">
                                <div>
                                  <BsCalendarCheck />
                                </div>
                                {event.day}, {event.start_time} -{" "}
                                {event.end_time}
                              </div>
                            </div>
                          </div>
                        </Carousel.Caption>
                      </Carousel.Item>
                    );
                  })}
              </Carousel>
            </div>
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
