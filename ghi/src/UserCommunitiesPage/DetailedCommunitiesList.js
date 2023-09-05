import React, { useState, useEffect } from "react";

function DetailedCommunitiesList(props) {
  const [communities, setCommunities] = useState([]);

  async function getAllCommunities() {
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
    if (props.user.id != undefined) {
      getAllCommunities();
    }
  }, [props.user]);

  return (
    <div style={{ width: "100%" }}>
      <h4 className="mt-3">My Communities:</h4>
      <div className="d-flex">
        <div>
          {communities.map((com) => {
            return (
              <div className="card m-2" key={com.id}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain1.webp"
                      className="img-fluid rounded-start"
                      alt="event"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{com.name}</h5>
                      <p className="card-text">{com.description}</p>
                      <div className="card-text">
                        <div>
                          <small className="text-muted">
                            {com.city}, {com.state}
                          </small>
                        </div>
                      </div>
                      <div>
                        <button type="button" className="btn btn-primary">
                          Leave
                        </button>
                      </div>
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

export default DetailedCommunitiesList;
