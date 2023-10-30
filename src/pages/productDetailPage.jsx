import { useEffect, useState } from "react";
import axiosInstance, { axiosProducts } from "../utils/axiosInstance";
import { useParams } from "react-router-dom";
import "../css/inverseOrangeButton.css";
import "../css/orangeButton.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Modal, Button, Form } from "react-bootstrap";
import AllReviewList from "../components/allReviewList";

const ProductDetails = () => {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState();
  const [buttonText, setButtonText] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);

  //create review
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    axiosInstance.get(`books/${productId}`).then((resp) => {
      const data = resp.data;
      console.log(data);
      setProductDetails(data);
    });
  }, [productId]);

  //show review
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    axiosInstance
      .get(`books/${productId}/reviews`)
      .then((response) => {
        console.log(response.data);
        setReviews(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        setLoading(false);
      });
  }, [showAllReviews]);

  const handleClose = () => {
    setShow(false);
    setError("");
  };

  const handleShow = () => {
    setShow(true);
    setError("");
  };

  const handleReserve = () => {
    axiosInstance
      .post(`books/${productId}/reserve`)
      .then((resp) => {
        notifySuccess("The book has been reserved.");
        // Update the button or availability state as needed
        // You can set a state variable like isAvailable to false
        setIsAvailable(false);
      })
      .catch((error) => {
        notifySuccess("The book is already reserved.");
      });
  };

  const handlePostReview = () => {
    const clampedRating = Math.min(5, Math.max(0, rating));
    axiosInstance
      .post(`books/${productId}/reviews/create`, {
        comment: comment,
        rating: clampedRating,
      })
      .then((resp) => {
        // Handle success, e.g., navigate to the review page
        const newReview = {
          review_id: resp.data.review_id, // Update with the actual response data
          userId: Number(localStorage.getItem("id")), // Update with the current user ID
          userName: resp.data.userName, // Update with the current user's name
          bookId: productId,
          bookTitle: productDetails.title,
          comment: comment,
          rating: clampedRating,
        };
        setReviews([...reviews, newReview]);
        toast.success("Review created successfully.");
        handleClose();
      })
      .catch((error) => {
        // Handle error
        toast.success("Couldn't create review. Try again.");
      });
  };

  const notifySuccess = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleBorrow = () => {
    axiosInstance
      .post(`books/${productId}/borrow`)
      .then((resp) => {
        notifySuccess("The book has been borrowed.");
      })
      .catch((error) => {
        notifySuccess("The book is already borrowed.");
      });
    setToastMessage(toastMessage);
  };

  const handleReturn = () => {
    axiosInstance
      .post(`books/${productId}/return`)
      .then((resp) => {
        notifySuccess("The book has been returned.");
      })
      .catch((error) => {
        notifySuccess("Borrow the book first");
      });
    setToastMessage(toastMessage);
  };

  const handleCancelReservation = () => {
    axiosInstance
      .post(`books/${productId}/cancel-reservation`)
      .then((resp) => {
        notifySuccess("The reservation has been canceled.");
        // Update the button or availability state as needed
        // You can set a state variable like isAvailable to true
        setIsAvailable(true);
      })
      .catch((error) => {
        notifySuccess("The reservation canceled.");
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img
            src={productDetails?.imgUrl}
            style={{ width: "250px", marginTop: "80px" }}
          />
          <div
            style={{
              marginBottom: "40px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <button
              onClick={handleBorrow}
              className="orange-button"
              style={{ width: "140px", marginTop: "24px", marginRight: "15px" }}
            >
              Borrow
            </button>
            <button
              onClick={handleReturn}
              className="inverse-orange-button"
              style={{ width: "140px", marginTop: "24px" }}
            >
              Return
            </button>
          </div>
          <div
            style={{
              marginBottom: "10px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <button
              onClick={handleReserve}
              className="orange-button"
              style={{ width: "140px", marginRight: "15px" }}
            >
              Reserve
            </button>
            <button
              onClick={handleCancelReservation}
              className="inverse-orange-button"
              style={{ width: "140px" }}
            >
              Cancel
            </button>
          </div>
          <ToastContainer
            autoclose={1000}
            position={toast.POSITION.TOP_CENTER}
          />
        </div>

        <div style={{ marginTop: "140px" }}>
          <h3 style={{ marginLeft: "40px" }}>{productDetails?.title}</h3>
          <h4 style={{ marginLeft: "40px", color: "grey" }}>
            {productDetails?.author}
          </h4>
          <h5 style={{ marginLeft: "40px" }}>{productDetails?.description}</h5>
        </div>
      </div>
      <div>
        <h2 style={{ marginLeft: "40px" }}>Reviews:</h2>
      </div>

      <div>
        <Button
          style={{
            width: "160px",
            marginTop: "40px",
            marginLeft: "40px",
            marginBottom: "30px",
          }}
          className="orange-button"
          onClick={handleShow}
        >
          Post Review
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Post a Review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="comment">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="rating">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  type="number"
                  value={rating}
                  onChange={(e) => {
                    const newRating = parseInt(e.target.value);
                    setRating(newRating);
                  }}
                />
              </Form.Group>
            </Form>
            <span style={{ color: "red" }}>{error}</span>
          </Modal.Body>
          <Modal.Footer>
            <Button
              style={{ width: "100px" }}
              className="inverse-orange-button"
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              style={{ width: "140px" }}
              className="orange-button"
              onClick={handlePostReview}
            >
              Post Review
            </Button>
          </Modal.Footer>
        </Modal>

        <div
          className="whole-container"
          style={{
            justifyContent: "space-between",
          }}
        >
          <AllReviewList reviews={reviews} productId={productId} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
