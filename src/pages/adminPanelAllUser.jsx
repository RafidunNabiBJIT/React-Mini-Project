import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import UserDetailsModal from "../components/userDetailsModal";
import "../css/orangeButton.css";

const AdminPanelAllUser = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Track the selected user
  const [showModal, setShowModal] = useState(false);

  const openModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    axiosInstance
      .get("/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div
      className="container"
      style={{ marginTop: "80px", marginBottom: "200px" }}
    >
      <h1>Admin Panel - User Information</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName + " " + user.lastName}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="orange-button"
                  style={{ width: "130px" }}
                  onClick={() => openModal(user)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <UserDetailsModal user={selectedUser} closeModal={closeModal} />
      )}
    </div>
  );
};

export default AdminPanelAllUser;
