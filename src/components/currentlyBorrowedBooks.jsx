import "../css/card.css";
import "../css/cardproducts.css";
import "../css/wholeContainer.css";
import "../css/orangeButton.css";
import "../css/bookCard.css";
import { useNavigate } from "react-router-dom";
const CurrentlyBorrowedBooks = ({ currentlyBorrowedProducts }) => {
  const navigate = useNavigate();

  return (
    <div className="whole-container">
      <div className="cardp-container">
        <div style={{ justifyContent: "center" }}>
          <div style={{ marginTop: "30px" }}>
            <h2>Your Currently Borrowed Books</h2>
          </div>
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
              <button
                onClick={() => navigate(`/${currentlyBorrowedProduct.id}`)}
                className="orange-button"
                style={{ width: "110px" }}
              >
                Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrentlyBorrowedBooks;
