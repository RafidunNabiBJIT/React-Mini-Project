import FetchButton from "./fetchButton";
import AllProductList from "./allProductList";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import ProductList from "./productList";
import Cart from "./cart";
import "../css/card.css";
import useProductHook from "../hooks/useProductHook";
export const ProductContext = createContext("");

function Home() {
  const {
    cart,
    products,
    loading,
    addToCart,
    addToFavorites,
    removeItem,
    fetchProducts,
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
                "Add to Cart" button, you can swiftly add your desired item to
                your shopping cart, saving you time and effort.
              </h5>
            </div>

            <ProductContext.Provider value={{ cart, removeItem }}>
              <Cart />
            </ProductContext.Provider>
          </div>
        </div>
      </div>
      <div className="whole-container">
        <FetchButton fetchProducts={fetchProducts} />
      </div>

      <div className="whole-container">
        <AllProductList products={products} loading={loading} />
      </div>
    </div>
  );
}

export default Home;
