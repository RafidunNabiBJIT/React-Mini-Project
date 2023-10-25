import { useState } from "react";
import axiosInstance, { axiosInstanceLogin } from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Loggin in");

    const userCredential = {
      email: email,
      password: password,
    };

    axiosInstance.post("user/login", userCredential).then((resp) => {
      const data = resp.data;

      console.log("Response from login ", data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("id", data.id);
      if (data.role === "CUSTOMER") {
        navigate("/home"); // Redirect to page1 for regular users
      } else if (data.role === "ADMIN") {
        navigate("/adminPanel"); // Redirect to page2 for admins
      }
    });
  };

  return (
    <div
      className="container mt-5"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "170px",
        width: "300px",
      }}
    >
      <div>
        <div>
          <div>
            <div
              className="card-body"
              style={{
                width: "370px",
              }}
            >
              <h2
                className="card-title text-center"
                style={{
                  marginTop: "10px",
                }}
              >
                Login
              </h2>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className="form-label"
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    style={{
                      marginTop: "10px",
                    }}
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="d-grid whole-container">
                  <button
                    type="submit"
                    className="orange-button"
                    style={{
                      marginTop: "20px",
                      width: "90px",
                    }}
                  >
                    Log In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
