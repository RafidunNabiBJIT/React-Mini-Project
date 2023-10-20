import { useState, useContext, useEffect } from "react";
import axios from "axios";

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching products...");
    axios
      .get("https://reqres.in/api/users")
      .then((response) => {
        console.log(response.data.data);
        setProducts(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading }}>
      {children}
    </ProductContext.Provider>
  );
};

const useProductContext = () => {
  return useContext(ProductContext);
};

export { ProductProvider, useProductContext };
