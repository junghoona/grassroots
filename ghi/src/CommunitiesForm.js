import { useState, useEffect } from "react";

function CommunitiesForm() {
  // useState hooks to define input fields
  const [name, setName] = useState("");
  const [city, setCity] = useState([]);
  const [states, setStates] = useState([]);
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [creatorID, setCreatorID] = useState("");

  useEffect(() => {
    async function getStates() {
      const where = encodeURIComponent(
        JSON.stringify({
          name: {
            $exists: true,
          },
        })
      );
      const url = `https://parseapi.back4app.com/classes/Usabystate_States?limit=50&order=name&keys=name,objectId,population,postalAbreviation&where=${where}`;
      const response = await fetch(url, {
        headers: {
          "X-Parse-Application-Id": "YeFK5eZAEn05owCNmcWhucKigaBpM00alBP4QdCX", // This is your app's application id
          "X-Parse-REST-API-Key": "YkBFQLNkHV3fojvuhqCsfTBCjTAjU4xfFYaUaPQd", // This is your app's REST API key
        },
      });

      if (response.ok) {
        const data = await response.json(); // Here you have the data that you need
        console.log("DATA: ", JSON.stringify(data, null, 2));
        setStates(data["results"]);
      }
    }
    getStates();
  }, [setStates]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // create an empty data obj
    const data = {};

    // assign values to the key names that backend server is expecting
    data.name = name;
    data.city = city;
    data.state = states;
    data.type = type;
    data.description = description;
    data.creator_id = creatorID;

    const url = `${process.env.REACT_APP_API_HOST}/api/communities`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const newCommunity = await response.json();
      console.log(newCommunity);

      setName("");
      setCity("");
      setStates("");
      setType("");
      setDescription("");
      setCreatorID("");
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new community</h1>
          <form onSubmit={handleSubmit} id="create-community-form">
            <div className="form-floating mb-3">
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
            <div className="form-floating mb-3">
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
            <div className="form-floating mb-3">
              <label htmlFor="state" className="form-label">
                Choose your state
              </label>
              <select
                required
                className="form-select"
                id="states"
                aria-label="Choose your state"
              >
                <option value="">Open this select menu</option>
                {states.map((state) => (
                  <option key={state.objectId} value={state.objectId}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-floating mb-3">
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
            <div className="form-floating mb-3">
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
            <div className="form-floating mb-3">
              <input
                value={creatorID}
                onChange={(e) => setCreatorID(e.target.value)}
                placeholder="Enter Creator ID here..."
                required
                type="text"
                name="creator_id"
                id="creator_id"
                className="form-control"
              />
              <label htmlFor="creator_id">Creator ID</label>
            </div>
            <button disabled={states.length === 0} className="btn btn-primary">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CommunitiesForm;
