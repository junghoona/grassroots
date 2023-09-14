import { useState, useEffect } from "react";
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
  let formClass = "form-floating mb-3";

  if (created) {
    successMsg = "alert alert-success mb-0";
    formClass.concat("d-none");
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new community</h1>
          <form onSubmit={handleSubmit} id="create-community-form">
            <div className={formClass}>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Fill in name..."
                required
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
              <label htmlFor="name">Name</label>
            </div>
            <div className={formClass}>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Fill in City..."
                required
                type="text"
                name="city"
                id="city"
                className="form-control"
              />
              <label htmlFor="last_name">City</label>
            </div>
            <label htmlFor="state" className="form-label">
              Choose your state
            </label>
            <div className={formClass}>
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
              <input
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="Fill in Type..."
                type="text"
                name="type"
                id="type"
                className="form-control"
              />
              <label htmlFor="type">Type</label>
            </div>
            <div className={formClass}>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Fill in Description..."
                type="text"
                name="description"
                id="description"
                className="form-control"
              />
              <label htmlFor="description">Description</label>
            </div>
            <div className={formClass}>
              <input
                value={creatorID}
                type="hidden"
                name="creator_id"
                id="creator_id"
              />
            </div>
            <button disabled={states.length === 0} className="btn btn-primary">
              Create
            </button>
          </form>
          <div className={successMsg} id="success-message">
            Success! You created a new community!
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunitiesForm;
