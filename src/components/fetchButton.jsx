import "../css/orangeButton.css";
const FetchButton = ({ fetchProducts }) => {
  const handleClick = () => {
    fetchProducts();
  };

  return (
    <button
      onClick={handleClick}
      className="orange-button"
      style={{ width: "200px" }}
    >
      Show All Books
    </button>
  );
};

export default FetchButton;
