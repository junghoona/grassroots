import { useState, useEffect } from "react";
import GreenBean from "../Assets/greenbean.png";
import { getCurrentUser } from "../UserProfilePage/UserProfilePage";

async function makeCreatorMember(creatorId, communityId) {
  const url = `${process.env.REACT_APP_API_HOST}/api/members/`;
  let data = {};
  data.person = creatorId;
  data.community = communityId;
  const response = await fetch(url, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw Error(`Could not make creator a member of the community ${response}`);
  }
}

const CommunitiesForm = () => {
  // useState hooks to define input fields
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [states, setStates] = useState([]);
  const [state, setState] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [creatorID, setCreatorID] = useState("");
  const [created, setCreated] = useState(false);

  const backgroundColor = {
    backgroundColor: "#f3f2f2",
  };

  const buttonColor = {
    backgroundColor: "#92aad0",
  };

  const containerStyle = {
    marginTop: "10%",
  };

  const headerStyle = {
    textAlign: "center",
    fontSize: "30px",
  };

  const imgStyle = {
    borderTopLeftRadius: "1rem",
    borderBottomLeftRadius: "1rem",
    height: "100%",
  };

  useEffect(() => {
    async function getStates() {
      const where = encodeURIComponent(
        JSON.stringify({
          name: {
            $exists: true,
          },
        })
      );
      const url = `${process.env.REACT_APP_STATE_API_URL}${where}`;
      const response = await fetch(url, {
        headers: {
          "X-Parse-Application-Id": `${process.env.REACT_APP_STATE_APPLICATION_ID}`,
          "X-Parse-REST-API-Key": `${process.env.REACT_APP_STATE_REST_API_KEY}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setStates(data["results"]);
      }
    }
    getStates();
  }, [setStates]);

  useEffect(() => {
    getCurrentUser().then((user) => setCreatorID(user.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creatorID]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name: name,
      city: city,
      state: state,
      type: type,
      description: description,
      creator_id: creatorID,
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/communities`,
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
      let createdCommunity = await response.json();
      makeCreatorMember(creatorID, createdCommunity.id);
      setName("");
      setCity("");
      setState("");
      setType("");
      setDescription("");
      setCreatorID("");
      setCreated(true);
    } else {
      console.error(response);
    }
  };

  let successMsg = "alert alert-success d-none mb-0";
  let formClass = "form-outline mb-4";

  if (created) {
    successMsg = "alert alert-success mb-0";
    formClass.concat("d-none");
  }

  return (
    <div className="bg-image h-100" style={backgroundColor}>
      <div className="mask d-flex align-items-center">
        <div className="container" style={containerStyle}>
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-12 col-lg-9 col-lg-8">
              <div className="card">
                <div className="row g-0">
                  <div className="col-md-5 d-none d-md-block">
                    <img
                      className="img-fluid"
                      src={GreenBean}
                      alt="Green Bean"
                      style={imgStyle}
                    />
                  </div>
                  <div className="col-md-5 d-flex align-items-center">
                    <div className="card-body py-5 px-4 p-md-4">
                      <form onSubmit={handleSubmit} id="create-community-form">
                        <h1 className="fw-bold mb-4" style={headerStyle}>
                          Create a new community
                        </h1>
                        <div className={formClass}>
                          <label htmlFor="name" className="form-label">
                            Name
                          </label>
                          <input
                            placeholder="Fill in name..."
                            required
                            name="name"
                            type="text"
                            className="form-control"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                          />
                        </div>
                        <div className={formClass}>
                          <label htmlFor="city" className="form-label">
                            City
                          </label>
                          <input
                            placeholder="Fill in City..."
                            required
                            name="city"
                            type="text"
                            className="form-control"
                            onChange={(e) => setCity(e.target.value)}
                            value={city}
                          />
                        </div>
                        <div className={formClass}>
                          <label htmlFor="state" className="form-label">
                            Choose your state
                          </label>
                          <select
                            onChange={(e) => setState(e.target.value)}
                            required
                            className="form-select"
                            id="state"
                            aria-label="Choose your state"
                          >
                            <option value="">Open this select menu</option>
                            {states.map((state) => {
                              return (
                                <option
                                  key={state.objectId}
                                  value={state.postalAbbreviation}
                                >
                                  {state.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className={formClass}>
                          <select
                            onChange={(e) => setType(e.target.value)}
                            required
                            id="type"
                            className="form-select"
                            aria-label="Select a community type"
                          >
                          <option value="">Select a Type</option>
                          <option value="Biodiversity">Biodiversity</option>
                          <option value="Waste Reduction">Waste Reduction</option>
                          <option value="Sustainable Energy">Sustainable Energy</option>
                          <option value="Sustainable Food Management">Sustainable Food Management</option>
                          <option value="Air Quality">Air Quality</option>
                          </select>
                        </div>
                        <div className={formClass}>
                          <label htmlFor="description">Description</label>
                          <input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Fill in Description..."
                            type="text"
                            name="description"
                            id="description"
                            className="form-control"
                          />
                        </div>
                        <div className={formClass}>
                          <input
                            value={creatorID}
                            type="hidden"
                            name="creator_id"
                            id="creator_id"
                          />
                        </div>
                        <div className="d-flex justify-content-end pt-1 mb-4">
                          <button
                            disabled={states.length === 0}
                            className="btn btn-primary btn-rounded"
                            style={buttonColor}
                            type="submit"
                          >
                            Create
                          </button>
                        </div>
                      </form>
                      <div className={successMsg} id="success-message">
                        Success! You created a new community!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunitiesForm;
