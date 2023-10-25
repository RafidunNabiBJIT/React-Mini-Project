import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import "../../css/orangeButton.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdateBookForm() {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    axiosInstance
      .get(`books/${bookId}`)
      .then((resp) => {
        const bookData = resp.data;
        setTitle(bookData.title);
        setAuthor(bookData.author);
        setImgUrl(bookData.imgUrl);
        setImgUrl(bookData.description);
      })
      .catch((error) => {
        console.log("Error fetching book data: ", error);
        setError(error);
      });
  }, [bookId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedBookData = {
      title: title,
      author: author,
      imgUrl: imgUrl,
      description: description,
    };

    axiosInstance
      .put(`books/update/${bookId}`, updatedBookData)
      .then((resp) => {
        console.log("Book updated successfully");
        navigate("/adminpanel");
        toast.success("Updated successfully");
      })
      .catch((error) => {
        console.log("Error updating book: ", error);
        setError(error);
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
        width: "500px",
      }}
    >
      <h2>Update Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group" style={{ width: "500px" }}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="imgUrl">Image URL:</label>
          <input
            type="text"
            id="imgUrl"
            name="imgUrl"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
          />
        </div>
        <button
          type="submit"
          className="orange-button"
          style={{ width: "150px", marginTop: "20px" }}
        >
          Update Book
        </button>
      </form>
    </div>
  );
}

export default UpdateBookForm;
