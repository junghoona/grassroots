import React, { useState, useEffect } from "react";

function CommunitiesList(props) {
  const [communities, setCommunities] = useState([]);

  async function getAllCommunities() {
    const url = `${process.env.REACT_APP_API_HOST}/api/communities`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setCommunities(data);
    } else {
      console.log("Failed to fetch data!");
    }
  }

  useEffect(() => {
    getAllCommunities();
  }, []);

  return (
    <div
      className="card"
      style={{ maxWidth: "400px", backgroundColor: "#f8f9fa" }}
    >
      <h4 className="mt-3">My Communities:</h4>
      {communities.map((community) => {
        return (
          <div className="d-flex" key={community.id}>
            <div className="overflow-auto" style={{ height: "200px" }}>
              <div className="card m-2">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain1.webp"
                      className="img-fluid rounded-start"
                      alt="community"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{community.name}</h5>
                      <p className="card-text">{community.description}</p>
                      <p className="card-text">
                        <small className="text-muted">
                          {community.city}, {community.state}
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CommunitiesList;
