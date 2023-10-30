import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import "../../css/orangeButton.css";

function BookForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [createdBook, setCreatedBook] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Loggin in");

    const userCredential = {
      title: title,
      author: author,
      imgUrl: imgUrl,
    };

    console.log(title);
    console.log(author);
    console.log(imgUrl);

    axiosInstance
      .post("books/create", userCredential)
      .then((resp) => {
        const data = resp.data;
        setCreatedBook(data);
        console.log("Response from create book ", data);
        localStorage.setItem("token", data.token);
        navigate("/adminpanel");
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
    <div>
      <h2>Create a New Book</h2>
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
          Add Book
        </button>
      </form>
    </div>
  );
}

export default BookForm;
