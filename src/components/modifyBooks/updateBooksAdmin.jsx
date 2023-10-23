import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import "../../css/orangeButton.css";

function UpdateBookForm() {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [imgUrl, setImgUrl] = useState("");
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
    };

    axiosInstance
      .put(`books/update/${bookId}`, updatedBookData)
      .then((resp) => {
        console.log("Book updated successfully");
        navigate("/adminpanel");
        toast.success("Book updated successfully", {
          autoClose: 3000,
        });
      })
      .catch((error) => {
        console.log("Error updating book: ", error);
        setError(error);
      });
  };

  return (
    <div>
      <h2>Update Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
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
        <button type="submit" className="orange-button">
          Update Book
        </button>
      </form>
    </div>
  );
}

export default UpdateBookForm;
