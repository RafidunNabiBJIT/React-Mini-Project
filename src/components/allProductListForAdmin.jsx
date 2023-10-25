import "../css/card.css";
import "../css/cardproducts.css";
import "../css/wholeContainer.css";
import "../css/orangeButton.css";
import "../css/bookCard.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
const AllProductListForAdmin = ({ products, fetchProducts, loading }) => {
  const navigate = useNavigate();

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleDeleteBook = (bookId) => {
    axiosInstance
      .delete(`books/delete/${bookId}`)
      .then((resp) => {
        console.log("Book deleted successfully.");
        fetchProducts();
      })
      .catch((error) => {
        console.log("Error deleting book: ", error);
      });
  };

  const handleUpdateBook = (bookId) => {
    navigate(`/updateBook/${bookId}`);
  };

  return (
    <div className="whole-container">
      <div className="cardp-container">
        {products.map((product) => (
          <div className="book-card" key={product.id}>
            <img
              src={product.imgUrl}
              alt={product.title}
              style={{
                height: "370px",
                widht: "140px",
                borderRadius: "10px",
              }}
            />
            {console.log(product.imgUrl)}
            <div className="product-title">{product.title}</div>
            <div className="product-author">{product.author}</div>
            <button
              onClick={() => navigate(`admin/${product.id}`)}
              className="orange-button"
              style={{ width: "80px" }}
            >
              Details
            </button>
            <div className="whole-container">
              <button
                onClick={() => handleDeleteBook(product.id)}
                className="orange-button"
                style={{ width: "80px" }}
              >
                Delete
              </button>
              <button
                onClick={() => handleUpdateBook(product.id)}
                className="orange-button"
                style={{ width: "80px" }}
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProductListForAdmin;
