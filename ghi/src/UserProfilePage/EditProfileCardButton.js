import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { fetchStates } from "../EventsForm";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function EditProfileCardButton(props) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [avatar, setAvatar] = useState("");
  const [city, setCity] = useState("");
  const [states, setStates] = useState([]);
  const [state, setState] = useState("");

  useEffect(() => {
    fetchStates().then((data) => setStates(data["results"]));
  }, []);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function handleEditBio(event) {
    event.preventDefault();
    let data = {};
    if (avatar === "") {
      data.avatar = props.user.avatar;
    } else {
      data.avatar = avatar;
    }
    if (city === "") {
      data.city = props.user.city;
    } else {
      data.city = city;
    }
    if (state === "") {
      data.state = props.user.state;
    } else {
      data.state = state;
    }
    data.bio = props.user.bio;
    const url = `${process.env.REACT_APP_API_HOST}/api/user/${props.user.id}`;
    const response = await fetch(url, {
      credentials: "include",
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      props.fetchUpdatedUserData();
      closeModal();
    } else {
      console.log("BIO DID NOT UPDATE! SOMETHING WENT WRONG!");
    }
  }

  return (
    <>
      <button onClick={openModal} className="btn btn-outline-primary ms-1">
        Edit
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="d-flex flex-column align-items-center">
          <form
            onSubmit={handleEditBio}
            className="d-flex flex-column align-items-center"
          >
            <div className="form-group">
              <label htmlFor="exampleFormControlInput1">
                Profile Picture Link
              </label>
              <input
                onChange={(e) => setAvatar(e.target.value)}
                type="text"
                className="form-control"
                id="email"
                placeholder={props.user.avatar}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="exampleFormControlInput1">City</label>
              <input
                onChange={(e) => setCity(e.target.value)}
                type="text"
                className="form-control"
                id="city"
                placeholder={props.user.city}
              />
            </div>
            <div className="form-group mb-3">
              <select
                onChange={(e) => setState(e.target.value)}
                required
                className="form-select"
                id="state"
                aria-label="Select a State"
              >
                <option value="">Select a State</option>
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
            <div>
              <button type="submit" className="btn btn-primary">
                Confirm
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default EditProfileCardButton;
