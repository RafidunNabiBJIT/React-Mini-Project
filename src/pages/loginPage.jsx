import { useState } from "react";
import axiosInstance, { axiosInstanceLogin } from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const handleLogin = async (e) => {
    e.preventDefault();

    const userCredential = {
      email: email,
      password: password,
    };

    try {
      const resp = await axiosInstance.post("user/login", userCredential);
      const data = resp.data;
      console.log("Response from login", data);

      localStorage.setItem("token", data.token);
      console.log("Set korar shomoy role: " + data.role);
      localStorage.setItem("role", data.role);
      console.log(localStorage.getItem("role"));
      localStorage.setItem("id", data.id);

      if (data.role === "CUSTOMER") {
        navigate("/home"); // Redirect to page1 for regular users
      } else if (data.role === "ADMIN") {
        navigate("/adminPanel"); // Redirect to page2 for admins
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid email or password. Please try again.");
    }
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
              {error && (
                <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
              )}
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
