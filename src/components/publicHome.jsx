import FetchButton from "./fetchButton";
import AllProductListPublic from "./allProductListPublic";
import { createContext } from "react";
import axios from "axios";
import ProductList from "./productList";
import Cart from "./cart";
import "../css/card.css";
import useProductHookPublic from "../hooks/useProductHookPublic";
export const ProductContext2 = createContext("");

function PublicHome() {
  const {
    cart,
    products,
    loading,
    addToCart,
    addToFavorites,
    removeItem,
    showAllProducts,
    fetchProducts,
  } = useProductHookPublic();

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
                "Add to Cart" button, you can swiftly add your desired item to
                your shopping cart, saving you time and effort.
              </h5>
            </div>

            <ProductContext2.Provider value={{ cart, removeItem }}>
              <Cart />
            </ProductContext2.Provider>
          </div>
        </div>
      </div>
      <div
        className="whole-container"
        style={{
          marginBottom: "30px",
          flexDirection: "column",
          width: "600px",
        }}
      >
        <h1 style={{ marginTop: "100px" }}>
          Borrow Your <span style={{ color: "#FF6347" }}>Favourite</span> Books
        </h1>
        <h5 style={{ marginBottom: "50px", textAlign: "justify" }}>
          Explore our diverse selection of books to find your next favorite
          read. Whether you're into thrilling mysteries, heartwarming romance,
          or insightful non-fiction, we have something for everyone.
        </h5>
      </div>

      <div className="whole-container">
        <AllProductListPublic
          products={products}
          fetchProducts={fetchProducts}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default PublicHome;
