import "../css/card.css";
import "../css/cardproducts.css";
import "../css/wholeContainer.css";
import "../css/orangeButton.css";
import "../css/bookCard.css";
import { useNavigate } from "react-router-dom";
const AllProductListPublic = ({ products, fetchProducts, loading }) => {
  const navigate = useNavigate();

  if (loading) {
    return <p>Loading...</p>;
  }

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
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProductListPublic;
