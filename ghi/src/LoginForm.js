import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GreenBean from "./Assets/greenbean.png";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useToken();
  const navigate = useNavigate();

  const backgroundColor = {
    backgroundColor: "#f3f2f2",
  };

  const containerStyle = {
    marginTop: "10%",
  };

  const headerStyle = {
    textAlign: "center",
    fontSize: "30px",
  };

  const imgStyle = {
    borderTopLeftRadius: "1rem",
    borderBottomLeftRadius: "1rem",
    height: "100%",
  };

  const buttonColor = {
    backgroundColor: "#92aad0",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
    e.target.reset();
    navigate("/");
  };

  return (
    <div className="bg-image h-100" style={backgroundColor}>
      <div className="mask d-flex align-items-center">
        <div className="container" style={containerStyle}>
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-12 col-lg-9 col-lg-8">
              <div className="card">
                <div className="row g-0">
                  <div className="col-md-5 d-none d-md-block">
                    <img
                      className="img-fluid"
                      src={GreenBean}
                      alt="Green Bean"
                      style={imgStyle}
                    />
                  </div>
                  <div className="col-md-5 d-flex align-items-center">
                    <div className="card-body py-5 px-4 p-md-4">
                      <form
                        className="space-y-6"
                        onSubmit={(e) => handleSubmit(e)}
                      >
                        <h2 className="fw-bold mb-4" style={headerStyle}>
                          Log in to your account
                        </h2>
                        <div className="form-outline mb-4">
                          <label htmlFor="username" className="form-label">
                            Email Address
                          </label>
                          <input
                            required
                            name="username"
                            type="text"
                            className="form-control"
                            onChange={(e) => {
                              setUsername(e.target.value);
                            }}
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <label htmlFor="password" className="form-label">
                            Password
                          </label>
                          <input
                            required
                            name="password"
                            type="password"
                            className="form-control"
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                          />
                        </div>
                        <div className="d-flex justify-content-end pt-1 mb-4">
                          <button
                            className="btn btn-primary btn-rounded"
                            type="submit"
                            style={buttonColor}
                            value="Login"
                          >
                            Log in
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

export default LoginForm;
