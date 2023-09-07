import React, { useState, useEffect } from "react";
import UserProfileCard from "./UserProfileCard";
import UserBio from "./UserBio";
import CommunitiesList from "./CommunitiesList";
import EventsList from "./EventsList";
import useToken from "@galvanize-inc/jwtdown-for-react";

// get user data via token
export async function getCurrentUser() {
  const url = `${process.env.REACT_APP_API_HOST}/token`;
  const response = await fetch(url, {
    credentials: "include",
  });
  if (response.ok) {
    const data = await response.json();
    return data.user;
  }
  throw Error(`Failed to fetch user data! ${response}`);
}

function UserProfilePage() {
  const [userData, setUserData] = useState("");
  const [userId, setUserId] = useState("");
  const { token } = useToken();

  useEffect(() => {
    if (token) {
      getCurrentUser().then((user) => setUserId(user.id));
    }
    if (userId !== "") {
      getUpdatedUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, userId]);

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
            <UserProfileCard
              user={userData}
              fetchUpdatedUserData={getUpdatedUserData}
            />
            <UserBio
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
        <div>Please log in to see your profile</div>
      )}
    </div>
  );
}

export default UserProfilePage;
