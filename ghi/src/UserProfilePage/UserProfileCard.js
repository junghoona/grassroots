import EditProfileCardButton from "./EditProfileCardButton";

function UserProfileCard(props) {
  return (
    <div
      className="card mb-4"
      style={{ width: "300px", backgroundColor: "#f8f9fa" }}
    >
      <div className="card-body text-center">
        <img
          src={props.user.avatar}
          alt="avatar"
          className="rounded-circle img-fluid"
          style={{ width: "150px" }}
        />
        <h1 className="my-1">
          {props.user.first_name} {props.user.last_name}
        </h1>
        <p className="text-muted mb-1">
          {props.user.city}, {props.user.state}
        </p>
        <div className="d-flex justify-content-center mb-2">
          <EditProfileCardButton
            user={props.user}
            fetchUpdatedUserData={props.fetchUpdatedUserData}
          />
        </div>
      </div>
    </div>
  );
}

export default UserProfileCard;
