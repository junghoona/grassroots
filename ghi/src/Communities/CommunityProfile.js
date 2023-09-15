import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMembers } from "../MembersList";
import { getCurrentUser } from "../UserProfilePage/UserProfilePage";

export async function fetchCommunity(community_id) {
  const url = `${process.env.REACT_APP_API_HOST}/api/communities/${community_id}`;
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  throw Error(`Could not fetch community ${JSON.stringify(response)}`);
}

export async function fetchEvents(community_id) {
  const url = `${process.env.REACT_APP_API_HOST}/api/events`;
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    const filteredEvents = data.filter(
      (e) => e.community === parseInt(community_id)
    );
    return filteredEvents;
  }
  throw Error(`Could not fetch events ${JSON.stringify(response)}`);
}

function CommunityProfile() {
  const [members, setMembers] = useState([]);
  const [events, setEvents] = useState([]);
  const [community, setCommunity] = useState({});
  const navigate = useNavigate();
  const { community_id } = useParams();
  const [user, setUser] = useState({});
  const [clicked, setClicked] = useState(false);

  const containerStyle = {
    marginTop: "5%",
  };

  async function JoinCommunity() {
    const data = {
      community: community_id,
      person: parseInt(user.id),
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/members`,
      {
        credentials: "include",
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      console.error(response);
    }
  }

  const handleClick = () => {
    JoinCommunity(community_id, parseInt(user.id)).then(() => {
      setClicked(true);
      fetchMembers(community_id).then((data) => setMembers(data));
    });
  };

  useEffect(() => {
    fetchCommunity(community_id).then((data) => setCommunity(data));
    Promise.all([getCurrentUser(), fetchMembers(community_id)]).then(
      (resolvedPromises) => {
        const [userData, memberData] = resolvedPromises;
        setMembers(memberData);
        setUser(userData);
        if (memberData.map((member) => member.person).includes(userData.id)) {
          setClicked(true);
        }
      }
    );
    fetchEvents(community_id).then((data) => setEvents(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="container" style={containerStyle}>
        <div className="row">
          <div className="col-md-8">
            <h1>{community.name}</h1>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleClick}
            >
              {clicked ? "Joined" : "Join Community"}
            </button>
            <div className="row">
              <div className="col-md-6" style={{ width: "100%" }}>
                <h3>About This Community</h3>
                <div className="p-4 card">
                  <p className="font-italic mb-1">{community.description}</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6" style={{ height: "300px" }}>
                <h3>Upcoming Community Events</h3>
                {events.map((event) => {
                  return (
                    <div className="card-deck" key={event.id}>
                      <div className="card mb-4" style={{ width: "70%" }}>
                        <div className="view overlay">
                          <img
                            className="card-img-top"
                            src={event.image}
                            alt="Card cap"
                          />
                        </div>
                        <div className="card-body" key={event.id}>
                          <h4 className="card-title">{event.name}</h4>
                          <p className="card-text">{event.description}</p>
                          <button
                            type="button"
                            className="btn btn-outlin-primary btn-md"
                            onClick={() => {
                              navigate(`/events/${event.id}`);
                            }}
                          >
                            Event Details
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-md-4" style={{ borderStyle: "solid" }}>
            <table className="table">
              <thead>
                <tr
                  onClick={() => {
                    navigate(`/members/${community_id}`);
                  }}
                >
                  <th>Members</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => {
                  return (
                    <tr key={member.id}>
                      <td>
                        <a
                          href={
                            process.env.PUBLIC_URL +
                            "/userprofile/" +
                            member.person
                          }
                        >
                          {member.first_name}
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityProfile;
