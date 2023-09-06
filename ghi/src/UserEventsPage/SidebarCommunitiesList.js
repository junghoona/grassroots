import React, { useState, useEffect } from "react";

function CommunitiesList(props) {
  const [communities, setCommunities] = useState([]);

  async function getCommunitiesUserIn() {
    const url = `${process.env.REACT_APP_API_HOST}/api/communities/user/${props.user.id}`;
    const response = await fetch(url, {
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      setCommunities(data.communities);
    } else {
      console.log("Failed to fetch data!");
    }
  }

  useEffect(() => {
    if (props.user.id !== undefined) {
      getCommunitiesUserIn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.user]);

  return (
    <div
      className="card col-sm"
      style={{ maxWidth: "400px", backgroundColor: "#f8f9fa" }}
    >
      <h4 className="mt-3">My Communities:</h4>
      <div className="d-flex">
        <div className="overflow-auto" style={{ height: "100%" }}>
          {communities.map((community) => {
            return (
              <div className="card m-2" key={community.id}>
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
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CommunitiesList;
