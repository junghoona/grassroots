import React, { useState, useEffect } from "react";
import LeaveCommunitiesButton from "./LeaveCommunititesModal";
import { Link } from "react-router-dom";

function DetailedCommunitiesList(props) {
  const [communities, setCommunities] = useState([]);

  async function getUserCommunities() {
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
      getUserCommunities();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.user]);

  return (
    <div
      className="d-flex flex-column align-items-center"
      style={{ width: "100%" }}
    >
      <div className="d-flex flex-column">
        <h4 className="mt-3">My Communities:</h4>
        <div>
          {communities.map((com) => {
            return (
              <div className="card m-2" key={com.id}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      style={{
                        objectFit: "fill",
                        height: "100%",
                        width: "100%",
                      }}
                      src="https://images.pexels.com/photos/3280130/pexels-photo-3280130.jpeg?auto=compress&cs=tinysrgb&w=600"
                      className="img-fluid rounded-start"
                      alt="event"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">
                        <Link
                          style={{ textDecoration: "none" }}
                          to={`/communities/${com.id}`}
                        >
                          {com.name}
                        </Link>
                      </h5>
                      <p className="card-text">{com.description}</p>
                      <div className="card-text">
                        <div>
                          <small className="text-muted">
                            {com.city}, {com.state}
                          </small>
                        </div>
                      </div>
                      <div>
                        <LeaveCommunitiesButton
                          userId={props.user.id}
                          communityId={com.id}
                          fetchComm={getUserCommunities}
                          commName={com.name}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {communities.length === 0 && (
            <div>This user is currently not in any communities</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailedCommunitiesList;
