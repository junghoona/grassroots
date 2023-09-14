import React, { useState } from "react";
import Modal from "react-modal";

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

function EditBioButton(props) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [bio, setBio] = useState("");

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function handleEditBio(event) {
    event.preventDefault();
    let data = {};
    data.avatar = props.user.avatar;
    data.bio = bio;
    data.city = props.user.city;
    data.state = props.user.state;
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
          <h5>Enter New Bio</h5>
          <form
            onSubmit={handleEditBio}
            className="d-flex flex-column align-items-center"
          >
            <textarea
              onChange={(e) => setBio(e.target.value)}
              className="form-control"
              placeholder={props.user.bio}
            ></textarea>
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

export default EditBioButton;
