import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance, {
  axiosInstanceProductService,
} from "../utils/axiosInstance";
import "../css/wholeContainer.css";
import "../css/orangeButton.css";
import "../css/cardRegister.css";

const AddProductPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");
  const [isRegistrationDone, setIsRegistrationDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const handleRegister = (e) => {
    e.preventDefault();

    const data = {
      // username: name,
      name: name,
      price: price,
      color: color,
      department: department,
      desription: description,
    };

    setIsLoading(true);
    axiosInstanceProductService
      .post("", data)
      .then((resp) => {
        console.log("The Response", resp);
        setIsRegistrationDone(true);
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
        <h1>Add Product</h1>
        {isRegistrationDone && (
          <h2 style={{ color: "green" }}>Successfully Done Registration</h2>
        )}
        {isLoading && <h1>Loading.....</h1>}
        <form onSubmit={handleRegister}>
          <div style={{ marginTop: "30px" }}>
            <h4>Name</h4>
            <input
              value={name}
              placeholder="Enter Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>

          <div style={{ marginTop: "30px" }}>
            <h4>Price</h4>
            <input
              value={price}
              placeholder="Enter Price"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>

          <div style={{ marginTop: "30px" }}>
            <h4>Color</h4>
            <input
              value={color}
              placeholder="Enter color"
              onChange={(e) => {
                setColor(e.target.value);
              }}
            />
          </div>

          <div style={{ marginTop: "30px" }}>
            <h4>Department</h4>
            <input
              value={department}
              placeholder="Enter Department"
              onChange={(e) => {
                setDepartment(e.target.value);
              }}
            />
          </div>

          <div style={{ marginTop: "30px" }}>
            <h4>Description</h4>
            <input
              value={description}
              placeholder="Enter Description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>

          <button
            style={{ marginTop: "30px" }}
            type="submit"
            className="orange-button"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
