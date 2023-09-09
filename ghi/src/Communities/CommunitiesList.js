import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CommunitiesList = () => {
  const [communities, setCommunities] = useState([]);
  const [states, setStates] = useState([]);
  const [state, setState] = useState("");
  const navigate = useNavigate();

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
            <button
              className="btn btn-outline-secondary"
              onClick={() =>
                navigate(`${process.env.PUBLIC_URL}/communities/create`)
              }
              type="button"
            >
              Create a New Community
            </button>
          </div>
        </div>
        <div className="container-fluid">
          {state.length === 0
            ? communities.map((community) => {
                return (
                  <div
                    key={community.id}
                    className="col-md-4 col-sm-6 card my-3 py-3 shadow"
                  >
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
                      <button
                        onClick={() =>
                          navigate(
                            `${process.env.PUBLIC_URL}/communities/${community.id}`
                          )
                        }
                        type="button"
                        className="btn btn-sm"
                      >
                        Read More
                      </button>
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
                      className="col-md-4 col-sm-6 card my-3 py-3 shadow"
                    >
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
                        <button
                          onClick={() =>
                            navigate(
                              `${process.env.PUBLIC_URL}/communities/${community.id}`
                            )
                          }
                          type="button"
                          className="btn btn-sm"
                        >
                          Read More
                        </button>
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
