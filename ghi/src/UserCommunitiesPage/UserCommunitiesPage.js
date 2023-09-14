import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import DetailedCommunitiesList from "./DetailedCommunitiesList";

function UserCommunitiesPage() {
  const [userData, setUserData] = useState({});
  const { token } = useToken();

  async function getCurrentUser() {
    const url = `${process.env.REACT_APP_API_HOST}/token`;
    const response = await fetch(url, {
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      setUserData(data.user);
    } else {
      console.log("Failed to fetch user data!");
    }
  }

  useEffect(() => {
    if (token) {
      getCurrentUser();
    }
  }, [token]);

  return (
    <div className="mt-4">
      {token ? (
        <DetailedCommunitiesList user={userData} />
      ) : (
        <div>Please log in to see your communities</div>
      )}
    </div>
  );
}

export default UserCommunitiesPage;
