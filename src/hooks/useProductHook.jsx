import axios from "axios";
import { useEffect, useState } from "react";
import axiosInstance, { axiosProducts } from "../utils/axiosInstance";

const useProductHook = () => {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  const [products, setProducts] = useState([]);
  const [currentlyBorrowedProducts, setCurrentlyBorrowedProducts] = useState(
    []
  );
  const [loading, setLoading] = useState(true);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [fetchBorrowedBooks, setFetchBorrowedBooks] = useState(false);
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

  const fetchCurrentlyBorrowedBooks = () => {
    const userId = localStorage.getItem("id"); // Retrieve userId from local storage
    console.log("Eitai user id " + userId);
    if (!userId) {
      console.error("User ID not found in local storage");
      return;
    }
    setLoading(true);
    axiosInstance
      .get(`users/${userId}/borrowed-books`)
      .then((response) => {
        console.log(response.data.data);
        setCurrentlyBorrowedProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching currently borrowed books:", error);
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
      fetchCurrentlyBorrowedBooks();
    }
  }, [showAllProducts]);
  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (!fetchBorrowedBooks) {
      axiosInstance
        .get(`users/${userId}/borrowed-books`)
        .then((response) => {
          console.log(response.data.data);
          setCurrentlyBorrowedProducts(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
          setLoading(false);
        });
    } else {
      fetchProducts();
    }
  }, [fetchBorrowedBooks]);
  return {
    cart,
    products,
    loading,
    addToCart,
    addToFavorites,
    removeItem,
    showAllProducts,
    fetchProducts,
    currentlyBorrowedProducts,
    fetchCurrentlyBorrowedBooks: () => setFetchBorrowedBooks(true),
  };
};

export default useProductHook;
