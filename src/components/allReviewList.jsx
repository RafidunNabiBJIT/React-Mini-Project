import React, { useEffect, useState } from "react";
import "../css/card.css";
import "../css/bookCard.css"; // Import your CSS styles
import "../css/cardproducts.css";
import "../css/wholeContainer.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const AllReviewList = ({ reviews, productId }) => {
  const navigate = useNavigate();
  const loggedInUserId = Number(localStorage.getItem("id"));
  const [editedReviews, setEditedReviews] = useState({});
  const [updatedReviews, setUpdatedReviews] = useState(reviews);

  const handleInputChange = (e, reviewId) => {
    const { name, value } = e.target;
    setEditedReviews({
      ...editedReviews,
      [reviewId]: { ...editedReviews[reviewId], [name]: value },
    });
  };

  const deleteReview = (reviewId) => {
    // Send a request to delete the review
    axiosInstance
      .delete(`/books/${productId}/reviews/${reviewId}/delete`)
      .then((response) => {
        // Remove the deleted review from the updatedReviews state
        const updatedReviewIndex = updatedReviews.findIndex(
          (r) => r.review_id === reviewId
        );
        if (updatedReviewIndex !== -1) {
          const newUpdatedReviews = [...updatedReviews];
          newUpdatedReviews.splice(updatedReviewIndex, 1);
          setUpdatedReviews(newUpdatedReviews);
        }
      })
      .catch((error) => {
        console.error("Delete failed:", error);
      });
  };

  const saveEditedReview = (reviewId) => {
    const updateData = {
      comment: editedReviews[reviewId].comment,
      rating: editedReviews[reviewId].rating,
    };

    axiosInstance
      .put(`/books/${productId}/reviews/${reviewId}/update`, updateData)
      .then((response) => {
        const updatedReviewIndex = updatedReviews.findIndex(
          (r) => r.review_id === reviewId
        );
        if (updatedReviewIndex !== -1) {
          const updatedReview = {
            ...updatedReviews[updatedReviewIndex],
            ...editedReviews[reviewId],
          };
          const newUpdatedReviews = [...updatedReviews];
          newUpdatedReviews[updatedReviewIndex] = updatedReview;
          setUpdatedReviews(newUpdatedReviews);
        }

        setEditedReviews({
          ...editedReviews,
          [reviewId]: { comment: "", rating: "" },
        });
      })
      .catch((error) => {
        console.error("Update failed:", error);
      });
  };

  useEffect(() => {
    // Update the component state when the reviews prop changes
    setUpdatedReviews(reviews);
  }, [reviews]);
  return (
    <div className="whole-container">
      <div className="cardp-container">
        {updatedReviews &&
          updatedReviews.map((review) => (
            <div
              className="card"
              key={review.review_id}
              style={{
                width: "1000px",
                paddingLeft: "100px",
              }}
            >
              <div className="review-user">
                <h3>Reviewer: {review.userName}</h3>
              </div>
              <div className="review-title">
                <h4>Rating: {review.rating}</h4>
              </div>
              <div className="review-comment">
                <h5>{review.comment}</h5>
              </div>
              {console.log("review eta " + review.comment)}

              {loggedInUserId === review.userId && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <input
                    style={{ width: "340px", height: "50px" }}
                    type="text"
                    name="comment"
                    placeholder="Edit Comment"
                    value={editedReviews[review.review_id]?.comment || ""}
                    onChange={(e) => handleInputChange(e, review.review_id)}
                  />
                  <label
                    style={{ widht: "100px", marginRight: "40px" }}
                    htmlFor={`rating-${review.review_id}`}
                  >
                    Rating:
                  </label>
                  <select
                    id={`rating-${review.review_id}`}
                    name="rating"
                    value={
                      editedReviews[review.review_id]?.rating || review.rating
                    }
                    onChange={(e) => handleInputChange(e, review.review_id)}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <button
                    onClick={() => saveEditedReview(review.review_id)}
                    className="orange-button"
                    style={{ width: "110px", marginTop: "10px" }}
                  >
                    Edit
                  </button>

                  {loggedInUserId === review.userId && (
                    <button
                      onClick={() => deleteReview(review.review_id)}
                      className="orange-button"
                      style={{ width: "110px" }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllReviewList;
