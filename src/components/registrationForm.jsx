import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import "../css/wholeContainer.css";
import "../css/orangeButtonAxios.css";
import "../css/cardRegister.css";

const RegistrationForm = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [isRegistrationDone, setIsRegistrationDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const handleRegister = (e) => {
    e.preventDefault();

    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      address: address,
      role: role,
    };

    setIsLoading(true);
    axiosInstance
      .post("/user/register", data)
      .then((resp) => {
        const data = resp.data;
        console.log("The Response", data.token);
        setIsRegistrationDone(true);
        localStorage.setItem("token", data.token);
        navigate("/");
        // setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error ", error);
        setError(error);
        // setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="whole-container">
      <div
        className="card-register"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 style={{ marginTop: "-170px" }}>Registration</h1>
        {isRegistrationDone && (
          <h2 style={{ color: "green" }}>Successfully Done Registration</h2>
        )}
        {isLoading && <h1>Loading.....</h1>}
        <form onSubmit={handleRegister}>
          <div style={{ marginTop: "50px" }}>
            <h4>First Name</h4>
            <input
              value={firstName}
              placeholder="Enter first name"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div style={{ marginTop: "30px" }}>
            <h4>Last Name</h4>
            <input
              value={lastName}
              placeholder="Enter last name"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <div style={{ marginTop: "30px" }}>
            <h4>Email</h4>
            <input
              value={email}
              placeholder="Enter email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div style={{ marginTop: "30px" }}>
            <h4>Password</h4>
            <input
              value={password}
              placeholder="Enter password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div style={{ marginTop: "30px" }}>
            <h4>Address</h4>
            <input
              value={address}
              placeholder="Enter address"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </div>

          <div style={{ marginTop: "30px" }}>
            <h4>Role</h4>
            <input
              value={role}
              placeholder="Enter role"
              onChange={(e) => {
                setRole(e.target.value);
              }}
            />
          </div>

          <button
            type="submit"
            className="orange-button"
            style={{ marginTop: "30px" }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
