import "../css/card.css";
import "../css/cardproducts.css";
import "../css/wholeContainer.css";
import "../css/orangeButton.css";
import { useNavigate } from "react-router-dom";
const AllBooks = ({ products, loading }) => {
  const navigate = useNavigate();
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="whole-container">
      <div className="cardp-container">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <img
              src={product.image}
              alt={product.title}
              style={{ maxWidth: "150px" }}
            />
            <div className="product-title">{product.title}</div>
            <div className="product-price">${product.price}</div>
            <button
              onClick={() => navigate(`/${product.id}`)}
              className="orange-button"
            >
              Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
