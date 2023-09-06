import { getCurrentUser } from "./UserProfilePage/UserProfilePage";
import { useState, useEffect } from "react";

function JoinCommunity({ communityId }) {
  const [user, setUser] = useState("");

  getCurrentUser().then((user) => setUser(user.id));

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      community: communityId,
      person: user,
    };

    console.log("DATA: ", data);

    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/members`,
      {
        method: "post",
        credentials: "include",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      console.log("RESPONSE: ", response);
    }
  };
}

export default JoinCommunity;
