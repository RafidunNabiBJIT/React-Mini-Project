import React, { useState } from "react";
import CurrentlyBorrowedBooks from "../components/currentlyBorrowedBooks";
import axiosInstance from "../utils/axiosInstance";
import "../css/orangeButton.css";
import CurrentlyBorrowedBooksForAdmin from "../components/currentlyBorrowedBooksForAdmin";

const AdminDataFetcher = () => {
  const [userId, setUserId] = useState("");
  const [currentlyBorrowedProducts, setCurrentlyBorrowedProducts] = useState(
    []
  );
  const [loading, setLoading] = useState(false);

  const fetchCurrentlyBorrowedBooks = () => {
    if (!userId) {
      console.error("Please provide a user ID");
      return;
    }

    setLoading(true);
    // Assuming you have an axiosInstance set up for your API calls
    axiosInstance
      .get(`users/${userId}/borrowed-books`)
      .then((response) => {
        setCurrentlyBorrowedProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching currently borrowed books:", error);
        setLoading(false);
      });
  };

  return (
    <div
      className="whole-container"
      style={{
        flexDirection: "column",
        justifyContent: "center",
        marginTop: "40px",
        marginBottom: "370px",
      }}
    >
      <label>
        Enter User ID:
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </label>
      <button
        className="orange-button"
        style={{ marginTop: "30px" }}
        onClick={fetchCurrentlyBorrowedBooks}
      >
        Go
      </button>

      {loading ? <p>Loading...</p> : null}

      {currentlyBorrowedProducts.length > 0 ? (
        <div className="whole-container" style={{ flexDirection: "row" }}>
          <CurrentlyBorrowedBooksForAdmin
            currentlyBorrowedProducts={currentlyBorrowedProducts}
          />
        </div>
      ) : null}
    </div>
  );
};

export default AdminDataFetcher;
