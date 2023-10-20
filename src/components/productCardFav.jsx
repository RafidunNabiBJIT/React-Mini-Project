import "../css/orangeButton.css";
import "../css/card.css";
function ProductCardFav({ product, onAddToFavorites }) {
  const handleAddToFavorites = () => {
    onAddToFavorites(product);
  };

  return (
    <div className="card">
      <button onClick={handleAddToFavorites} className="btn btn-primary">
        Add to Favorites
      </button>
    </div>
  );
}

export default ProductCardFav;
