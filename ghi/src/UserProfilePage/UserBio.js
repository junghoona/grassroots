import EditBioButton from "./EditBioButton";

function UserBio(props) {
  return (
    <div className="col">
      <p className="lead fw-normal mb-1">
        <span>
          About Me{" "}
          <EditBioButton
            user={props.user}
            fetchUpdatedUserData={props.fetchUpdatedUserData}
          />
        </span>
      </p>
      <div
        className="p-4 card"
        style={{ backgroundColor: "#f8f9fa", height: "70%" }}
      >
        <p className="font-italic mb-1">{props.user.bio}</p>
      </div>
    </div>
  );
}

export default UserBio;
