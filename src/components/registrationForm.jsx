import { useState } from "react";
import axiosInstance, { axiosInstanceLogin } from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("CUSTOMER");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Loggin in");

    const userCredential = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      address: address,
      role: role,
    };

    axiosInstance.post("user/register", userCredential).then((resp) => {
      const data = resp.data;

      console.log("Response from register ", data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
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
                Register
              </h2>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label
                    htmlFor="firstName"
                    className="form-label"
                    style={{ marginTop: "20px" }}
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Enter your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
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
                <div className="mb-3">
                  <label htmlFor="role" className="form-label">
                    Role
                  </label>
                  <select
                    className="form-control"
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="CUSTOMER">CUSTOMER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
                <div className="d-grid whole-container">
                  <button
                    type="submit"
                    className="orange-button"
                    style={{ marginTop: "20px", width: "90px" }}
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

export default Register;
