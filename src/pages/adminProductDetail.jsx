import { useEffect, useState } from "react";
import axiosInstance, { axiosProducts } from "../utils/axiosInstance";
import { useParams } from "react-router-dom";
import "../css/inverseOrangeButton.css";
import "../css/orangeButton.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Modal, Button, Form } from "react-bootstrap";
import AllReviewList from "../components/allReviewList";

const AdminProductDetail = () => {
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

  const handlePostReview = () => {
    const clampedRating = Math.min(5, Math.max(0, rating));
    axiosInstance
      .post(`books/${productId}/reviews/create`, {
        comment: comment,
        rating: clampedRating,
      })
      .then((resp) => {
        const newReview = {
          review_id: resp.data.review_id,
          userId: Number(localStorage.getItem("id")),
          userName: resp.data.userName,
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
            marginBottom: "10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img
            src={productDetails?.imgUrl}
            style={{ width: "250px", marginTop: "80px", marginBottom: "80px" }}
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
    </div>
  );
};

export default AdminProductDetail;
