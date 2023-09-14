import { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import GreenBean from "./Assets/greenbean.png";

const SignupForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [bio, setBio] = useState("");
  const [city, setCity] = useState([]);
  const [state, setState] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useToken();
  const navigate = useNavigate();

  const containerStyle = {
    marginTop: "10%",
  };

  const backgroundColor = {
    backgroundColor: "#f3f2f2",
  };

  const headerStyle = {
    textAlign: "center",
    fontSize: "30px",
  };

  const imgStyle = {
    borderTopLeftRadius: "1rem",
    borderBottomLeftRadius: "1rem",
  };

  const buttonStyle = {
    backgroundColor: "#92aad0",
    borderTopLeftRadius: "1rem",
    borderTopRightRadius: "1rem",
    borderBottomLeftRadius: "1rem",
    borderBottomRightRadius: "1rem",
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    const accountData = {
      first_name: firstName,
      last_name: lastName,
      avatar: avatar,
      bio: bio,
      city: city,
      state: state,
      username: email,
      email: email,
      password: password,
    };
    register(accountData, `${process.env.REACT_APP_API_HOST}/api/accounts`);
    e.target.reset();
    navigate("/");
  };

  return (
    <div className="bg-image" style={backgroundColor}>
      <div className="mask d-flex align-items-center">
        <div className="container" style={containerStyle}>
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-8 col-lg-7 col-xl-8">
              <div className="card">
                <div className="row g-0">
                  <div className="col-md-4 d-none d-md-block">
                    <img
                      className="img-fluid h-full"
                      src={GreenBean}
                      alt="Green Bea Slackmoji"
                      style={imgStyle}
                    />
                  </div>
                  <div className="col-md-8 d-flex align-items-center">
                    <div className="card-body py-5 px-4 p-md-5">
                      <form
                        className="space-y-6"
                        onSubmit={(e) => handleRegistration(e)}
                      >
                        <h2 className="fw-bold mb-4" style={headerStyle}>
                          Register for a new Account
                        </h2>
                        <div className="form-outline mb-4">
                          <label htmlFor="firstName" className="form-label">
                            First Name:
                          </label>
                          <input
                            required
                            name="firstName"
                            type="text"
                            className="form-control"
                            placeholder="Fill in your first name..."
                            onChange={(e) => {
                              setFirstName(e.target.value);
                            }}
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <label htmlFor="firstName" className="form-label">
                            Last Name:
                          </label>
                          <input
                            required
                            name="lastName"
                            type="text"
                            className="form-control"
                            placeholder="Fill in your last name..."
                            onChange={(e) => {
                              setLastName(e.target.value);
                            }}
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <label htmlFor="firstName" className="form-label">
                            Avatar:
                          </label>
                          <input
                            required
                            name="avatar"
                            type="text"
                            className="form-control"
                            placeholder="Fill in your avatar... (Optional)"
                            onChange={(e) => {
                              setAvatar(e.target.value);
                            }}
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <label htmlFor="firstName" className="form-label">
                            Bio:
                          </label>
                          <input
                            required
                            name="bio"
                            type="text"
                            className="form-control"
                            placeholder="Fill in your bio... (Optional)"
                            onChange={(e) => {
                              setBio(e.target.value);
                            }}
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <label htmlFor="firstName" className="form-label">
                            City:
                          </label>
                          <input
                            required
                            name="city"
                            type="text"
                            className="form-control"
                            placeholder="Fill in your city..."
                            onChange={(e) => {
                              setCity(e.target.value);
                            }}
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <label htmlFor="firstName" className="form-label">
                            State:
                          </label>
                          <input
                            required
                            name="state"
                            type="text"
                            className="form-control"
                            placeholder="Fill in your state..."
                            onChange={(e) => {
                              setState(e.target.value);
                            }}
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <label htmlFor="firstName" className="form-label">
                            Email:
                          </label>
                          <input
                            required
                            name="username"
                            type="text"
                            className="form-control"
                            placeholder="Fill in your Email..."
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <label htmlFor="firstName" className="form-label">
                            Password:
                          </label>
                          <input
                            required
                            name="password"
                            type="password"
                            className="form-control"
                            placeholder="Fill in your Password"
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                          />
                        </div>
                        <div className="d-flex justify-content-end pt-1 mb-4">
                          <button
                            className="btn btn-primary btn-rounded"
                            type="submit"
                            value="Register"
                            style={buttonStyle}
                          >
                            Create new account
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
