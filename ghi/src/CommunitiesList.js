import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CommunitiesColumn(props) {
  const navigate = useNavigate();

  return (
    <div className="col">
      {props.list.map((data) => {
        return (
          <div key={data.id} className="card mb-3 shadow">
            <img src="" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{data.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {data.city}, {data.state}
              </h6>
              <p className="card-text">{data.type}</p>
              <p className="card-text">{data.description}</p>
            </div>
            <div className="card-footer">
              <button
                onClick={() =>
                  navigate(`${process.env.PUBLIC_URL}/communities/create`)
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
  );
}

const CommunitiesList = () => {
  const [CommunityColumns, setCommunityColumns] = useState([[], [], []]);

  const fetchData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/communities`
    );
    if (response.ok) {
      const data = await response.json();

      // Create a list for all the requests and add all the requests to it
      const requests = [];
      for (let community of data) {
        const url = `${process.env.REACT_APP_API_HOST}/api/communities/${community.id}`;
        requests.push(fetch(url));
      }

      // Wait for all of the requests to finish simultaneously
      const responses = await Promise.all(requests);

      // Set up the "columns" to put the communities information into
      const columns = [[], [], []];

      let i = 0;
      for (const response of responses) {
        if (response.ok) {
          const details = await response.json();
          columns[i].push(details);
          i = i + 1;
          if (i > 2) {
            i = 0;
          }
        } else {
          console.error(response);
        }
      }

      // set the CommunityColumns state
      setCommunityColumns(columns);
    } else {
      console.error(response);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="container">
        <h2>Communities</h2>
        <div className="row">
          {CommunityColumns.map((CommunitiesList, index) => {
            return <CommunitiesColumn key={index} list={CommunitiesList} />;
          })}
        </div>
      </div>
    </>
  );
};

export default CommunitiesList;
