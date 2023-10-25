import FetchButton from "./fetchButton";
import AllProductList from "./allProductList";
import { createContext, useEffect, useState } from "react";
import ProductList from "./productList";
import "../css/card.css";
import useProductHook from "../hooks/useProductHook";
import CartForCustomer from "./cartForCustomer";
import CurrentlyBorrowedBooks from "./currentlyBorrowedBooks";
export const ProductContext = createContext("");

function Home() {
  const {
    cart,
    products,
    loading,
    addToCart,
    addToFavorites,
    removeItem,
    showAllProducts,
    fetchProducts,
    fetchCurrentlyBorrowedBooks,
    currentlyBorrowedProducts,
  } = useProductHook();

  return (
    <div className="container">
      <div className="container">
        <ProductList addToCart={addToCart} addToFavorites={addToFavorites} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px",
            padding: "20px",
            gap: "100px",
          }}
        >
          <div className="whole-container">
            <div>
              <h1>
                Select Items and Add To Your Own{" "}
                <span style={{ color: "#FF6347" }}>Cart</span>
              </h1>
              <h5>
                We've made shopping easy for you. With a single click on the
                "Add to Cart" button.
              </h5>
            </div>

            <ProductContext.Provider value={{ cart, removeItem }}>
              <CartForCustomer />
            </ProductContext.Provider>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          className="whole-container"
          style={{
            justifyContent: "center",
            marginBottom: "30px",
            flexDirection: "column",
            width: "600px",
          }}
        >
          <h1 style={{ marginTop: "100px" }}>
            Borrow Your <span style={{ color: "#FF6347" }}>Favourite</span>{" "}
            Books
          </h1>
          <h5 style={{ marginBottom: "50px", textAlign: "justify" }}>
            Explore our diverse selection of books to find your next favorite
            read. Whether you're into thrilling mysteries, heartwarming romance,
            or insightful non-fiction, we have something for everyone.
          </h5>
        </div>
      </div>

      <div className="whole-container">
        <AllProductList
          products={products}
          fetchProducts={fetchProducts}
          loading={loading}
        />
      </div>

      <div className="whole-container">
        <CurrentlyBorrowedBooks
          currentlyBorrowedProducts={currentlyBorrowedProducts}
        />
      </div>
    </div>
  );
}

export default Home;
