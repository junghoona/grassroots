import React from "react";
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

function LeaveCommunitiesButton(props) {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function leaveCommunity() {
    const url = `${process.env.REACT_APP_API_HOST}/api/members/${props.communityId}/${props.userId}`;
    const response = await fetch(url, {
      credentials: "include",
      method: "DELETE",
    });
    if (response.ok) {
      props.fetchComm();
    } else {
      console.log("Failed to leave community!");
    }
  }

  return (
    <>
      <button onClick={openModal} className="btn btn-outline-primary ms-1">
        Leave
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="d-flex flex-column align-items-center">
          <h5>Are you sure you want to leave this community?</h5>
          <h5>Community: {props.commName}</h5>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => {
              leaveCommunity();
            }}
          >
            Confirm
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              closeModal();
            }}
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
}

export default LeaveCommunitiesButton;
