import { Navigate, useNavigate } from "react-router-dom";

function AdminPanel() {
  const navigate = useNavigate();
  return (
    <div className="whole-container" style={{ marginBottom: "100px" }}>
      <div className="card whole-container">
        <button
          onClick={() => navigate("/adminPanelAllUser")}
          className="orange-button"
          style={{ width: "200px" }}
        >
          User Information
        </button>
        <button
          onClick={() => navigate("/createBook")}
          className="orange-button"
          style={{ marginTop: "20px", width: "200px" }}
        >
          Modify Books
        </button>
      </div>
    </div>
  );
}

export default AdminPanel;
