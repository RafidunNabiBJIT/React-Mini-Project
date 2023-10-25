import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const UserDetailsModal = ({ user, closeModal }) => {
  return (
    <Modal show={true} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Name: {user.firstName} {user.lastName}
        </p>
        <p>Email: {user.email}</p>
        <p>Address: {user.address}</p>
        <p>Role: {user.role}</p>
        {/* Add more user details as needed */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserDetailsModal;
