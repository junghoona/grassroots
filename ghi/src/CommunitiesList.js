import React, { useEffect, useState } from "react";

const CommunitiesList = () => {
  const [communities, setCommunities] = useState([]);
  const [columns, setColumns] = useState([[], [], []]);

  const fetchData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/communities`
    );
    if (response.ok) {
      const data = await response.json();
      console.log("DATA: ", JSON.stringify(data, null, 2));
      //   console.log("DATA: ", data);
      setCommunities(data);
    } else {
      console.error(response);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container m-3">
      <h1>Communities</h1>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Type</th>
            <th>Description</th>
            <th>Creator ID</th>
          </tr>
        </thead>
        <tbody>
          {communities.map((community) => {
            return (
              <tr key={community.id}>
                <td>{community.name}</td>
                <td>
                  {community.city}, {community.state}
                </td>
                <td>{community.type}</td>
                <td>{community.description}</td>
                <td>{community.creator_id}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CommunitiesList;
