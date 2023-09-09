import React, { useState, useEffect } from "react";
import IndividualUserProfileCard from "./IndividualUserProfileCard";
import IndividualUserBio from "./IndividualUserBio";
import CommunitiesList from "../UserProfilePage/CommunitiesList";
import EventsList from "../UserProfilePage/EventsList";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useParams } from "react-router-dom";

function IndividualProfilePage() {
  const [userData, setUserData] = useState("");
  const { userId } = useParams();
  const { token } = useToken();

  useEffect(() => {
    getUpdatedUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // gets user data via /api/user/{user_id}
  async function getUpdatedUserData() {
    const url = `${process.env.REACT_APP_API_HOST}/api/user/${userId}`;
    const response = await fetch(url, {
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      setUserData(data);
    } else {
      console.log("Failed to fetch user data!");
    }
  }

  return (
    <div>
      {token ? (
        <div className="container mt-4 mb-4">
          <div className="row">
            <IndividualUserProfileCard
              user={userData}
              fetchUpdatedUserData={getUpdatedUserData}
            />
            <IndividualUserBio
              user={userData}
              fetchUpdatedUserData={getUpdatedUserData}
            />
          </div>
          <div
            className="row d-flex justify-content-end"
            style={{ gap: "50px", marginRight: "0px" }}
          >
            <CommunitiesList user={userData} />
            <EventsList user={userData} />
          </div>
        </div>
      ) : (
        <div className="mt-4">Please log in to see other user's profile</div>
      )}
    </div>
  );
}

export default IndividualProfilePage;
