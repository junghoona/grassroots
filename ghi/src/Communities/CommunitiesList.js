import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CommunitiesList = () => {
  const [communities, setCommunities] = useState([]);
  const [states, setStates] = useState([]);
  const [state, setState] = useState("");

  const cardStyle = {
    textAlign: "center",
    margin: "10px 0",
  };

  const fetchData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/communities`
    );
    if (response.ok) {
      const data = await response.json();
      setCommunities(data);
    } else {
      console.error(response);
    }
  };

  useEffect(() => {
    async function getStates() {
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
        setStates(data["results"]);
      }
    }
    getStates();
    fetchData();
  }, [setStates]);

  return (
    <>
      <div className="container-fluid">
        <h2 style={{ textAlign: "center" }}>Communities</h2>
        <div className="input-group">
          <select
            onChange={(e) => setState(e.target.value)}
            required
            className="form-select"
            id="state"
            value={state}
          >
            <option value="">Filter by state...</option>
            {states.map((state) => {
              return (
                <option key={state.objectId} value={state.postalAbbreviation}>
                  {state.name}
                </option>
              );
            })}
          </select>
          <div className="input-group-append">
            <Link to={`/communities/create`} className="btn btn-primary">
              Create a New Community
            </Link>
          </div>
        </div>
        <div className="container-fluid">
          {state.length === 0
            ? communities.map((community) => {
                return (
                  <div
                    key={community.id}
                    className="card mb-4 shadow-lg bg-light"
                    style={cardStyle}
                  >
                    <img
                      className="card-img-top"
                      src="https://images.pexels.com/photos/3280130/pexels-photo-3280130.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="community"
                    />
                    <div className="card-body">
                      <h5 className="card-title fw-bold fs-4">
                        {community.name}
                      </h5>
                      <h6 className="card-subtitle">
                        {community.city}, {community.state}
                      </h6>
                      <p className="card-text">{community.type}</p>
                      <p className="card-text">{community.description}</p>
                    </div>
                    <div className="card-footer">
                      <Link to={`${community.id}`} className="btn btn-primary">
                        View Community Profile
                      </Link>
                    </div>
                  </div>
                );
              })
            : communities
                .filter((community) => {
                  return community.state === state;
                })
                .map((community) => {
                  return (
                    <div
                      key={community.id}
                      className="card mb-4 shadow-lg bg-light"
                      style={cardStyle}
                    >
                      <img
                        className="card-img-top"
                        src="https://images.pexels.com/photos/3280130/pexels-photo-3280130.jpeg?auto=compress&cs=tinysrgb&w=600"
                      />
                      <div className="card-body">
                        <h5 className="card-title fw-bold fs-4">
                          {community.name}
                        </h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                          {community.city}, {community.state}
                        </h6>
                        <p className="card-text">{community.type}</p>
                        <p className="card-text">{community.description}</p>
                      </div>
                      <div className="card-footer">
                        <Link
                          to={`${community.id}`}
                          className="btn btn-primary"
                        >
                          View Community Profile
                        </Link>
                      </div>
                    </div>
                  );
                })}
        </div>
      </div>
    </>
  );
};

export default CommunitiesList;
