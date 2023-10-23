import "../css/orangeButton.css";
import "../css/card.css";
import { Button } from "react-bootstrap";
import { Cart, Heart } from "react-bootstrap-icons";

function ProductCard({ product, addToCart, addToFavorites }) {
  const handleAddToCart = () => {
    addToCart(product);
  };
  const handleAddToFavorites = () => {
    addToFavorites(product);
  };
  return (
    <div className="card">
      <img src={product.image} className="card-img-top " alt={product.name} />
      <h5 className="mt-3">{product.name}</h5>
      <p>Price: ${product.price}</p>
      <div style={{ display: "flex" }}>
        <Button
          onClick={handleAddToCart}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")} // Scale up on hover
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          <Cart size={25} style={{ color: "#FF6347" }} />
        </Button>

        <Button
          onClick={handleAddToFavorites}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            marginLeft: "14px",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")} // Scale up on hover
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          <Heart size={25} style={{ color: "#FF6347" }} />
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;
