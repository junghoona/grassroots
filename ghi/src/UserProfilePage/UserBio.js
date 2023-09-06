import Button from "react-bootstrap-buttons";
import Modal from "react-modal";
import { useState } from "react";
import ModalTest from "./ModalTest";

function UserBio(props) {
  return (
    <div className="col">
      <p className="lead fw-normal mb-1">
        <span>About Me</span>
        <button className="btn btn-light">Edit</button>
      </p>
      <div
        className="p-4 card"
        style={{ backgroundColor: "#f8f9fa", height: "70%" }}
      >
        <p className="font-italic mb-1">{props.user.bio}</p>
      </div>
      <ModalTest />
    </div>
  );
}

export default UserBio;
