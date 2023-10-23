import axios from "axios";
import { useEffect, useState } from "react";
import axiosInstance, { axiosProducts } from "../utils/axiosInstance";

const useProductHook = () => {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const addToCart = (product) => {
    setCart([...cart, product]);
  };
  const addToFavorites = (product) => {
    setFavorites([...favorites, product]);
  };
  const removeItem = (itemToRemove) => {
    const updatedCart = cart.filter((item) => item !== itemToRemove);
    setCart(updatedCart);
  };

  const fetchProducts = () => {
    setLoading(true);
    axiosInstance
      .get("/books/all")
      .then((response) => {
        console.log(response.data.data);
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  };
  useEffect(() => {
    if (!showAllProducts) {
      axiosInstance
        .get("/books/all")
        .then((response) => {
          console.log(response.data.data);
          setProducts(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
          setLoading(false);
        });
    } else {
      fetchProducts();
    }
  }, [showAllProducts]);
  return {
    cart,
    products,
    loading,
    addToCart,
    addToFavorites,
    removeItem,
    showAllProducts,
    fetchProducts,
  };
};

export default useProductHook;
