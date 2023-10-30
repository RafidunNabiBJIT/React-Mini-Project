import "../css/card.css";
import "../css/cardproducts.css";
import "../css/wholeContainer.css";
import "../css/orangeButton.css";
import "../css/bookCard.css";
import { useNavigate } from "react-router-dom";
const CurrentlyBorrowedBooksForAdmin = ({ currentlyBorrowedProducts }) => {
  const navigate = useNavigate();

  return (
    <div className="whole-container">
      <div
        className="cardp-container"
        style={{ flexDirection: "column", alignItems: "center" }}
      >
        <div style={{ marginTop: "30px" }}>
          <h2>Currently Borrowed Books</h2>
        </div>
        <div
          className="whole-container"
          style={{ flexDirection: "row", justifyContent: "center" }}
        >
          {currentlyBorrowedProducts.map((currentlyBorrowedProduct) => (
            <div className="book-card" key={currentlyBorrowedProduct.id}>
              <img
                src={currentlyBorrowedProduct.imgUrl}
                alt={currentlyBorrowedProduct.title}
                style={{
                  height: "370px",
                  widht: "140px",
                  borderRadius: "10px",
                }}
              />
              {console.log(currentlyBorrowedProduct.imgUrl)}
              <div className="product-title">
                {currentlyBorrowedProduct.title}
              </div>
              <div className="product-author">
                {currentlyBorrowedProduct.author}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrentlyBorrowedBooksForAdmin;
