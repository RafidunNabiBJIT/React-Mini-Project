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
    <div className="card" style={{ marginTop: "50px" }}>
      <img src={product.image} className="card-img-top " alt={product.name} />
    </div>
  );
}

export default ProductCard;
