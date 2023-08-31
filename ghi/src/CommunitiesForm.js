import { useState, useEffect } from "react";

function CommunitiesForm() {
  // useState hooks to define input fields
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [states, setStates] = useState([]);
  const [state, setState] = useState("");
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
        setStates(data["results"]);
      }
    }
    getStates();
  }, [setStates]);

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

    console.log("DATA: ", data);

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
      const newCommunity = await response.json();
      console.log("COMMUNITY: ", newCommunity);

      setName("");
      setCity("");
      setState("");
      setType("");
      setDescription("");
      setCreatorID("");
    } else {
      console.error(response);
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
            <label htmlFor="state" className="form-label">
              Choose your state
            </label>
            <div className="form-floating mb-3">
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
