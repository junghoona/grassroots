import { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [avatar, setAvatar] = useState("");
  // const [bio, setBio] = useState("");
  const [city, setCity] = useState([]);
  const [state, setState] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useToken();
  const navigate = useNavigate();

  const handleRegistration = (e) => {
    e.preventDefault();
    const accountData = {
      firstName: firstName,
      lastName: lastName,
      city: city,
      state: state,
      username: email,
      password: password,
    };
    register(
      accountData,
      `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/accounts`
    );
    e.target.reset();
    navigate("/login");
  };

  return (
    <div className="card text-bg-light mb-3">
      <h5 className="card-header">Register for a new Account</h5>
      <div className="card-body">
        <form onSubmit={(e) => handleRegistration(e)}>
          <div className="mb-3">
            <label className="form-label">First Name: </label>
            <input
              name="firstName"
              type="text"
              className="form-control"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name: </label>
            <input
              name="lastName"
              type="text"
              className="form-control"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">City: </label>
            <input
              name="city"
              type="text"
              className="form-control"
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">State: </label>
            <input
              name="state"
              type="text"
              className="form-control"
              onChange={(e) => {
                setState(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">E-mail: </label>
            <input
              name="username"
              type="text"
              className="form-control"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <input className="btn btn-primary" type="submit" value="Register" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
