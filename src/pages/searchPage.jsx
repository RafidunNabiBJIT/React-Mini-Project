import { useEffect, useState } from "react";
import { axiosProducts } from "../utils/axiosInstance";

const SearchPage = () => {
  const [searchText, setSearchText] = useState("");
  const [productDetails, setProductDetails] = useState();
  const [loading, setLoading] = useState(false);

  const callProductDetailsApi = () => {
    setLoading(true);
    axiosProducts
      .get(`/${searchText}`)
      .then((resp) => {
        const data = resp.data;
        setProductDetails(data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      callProductDetailsApi();
    }, 1500);

    return () => clearTimeout(timeOut);
  }, [searchText]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "500px",
      }}
    >
      <h1>Search User</h1>
      <input
        value={searchText}
        placeholder="Enter search key"
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />

      {loading && <h1 style={{ color: "orange" }}>Loading</h1>}

      <h1>The details:</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3>{productDetails?.title}</h3>
        <h3>{productDetails?.price}</h3>
        <img src={productDetails?.image} style={{ maxWidth: "150px" }} />
      </div>
    </div>
  );
};

export default SearchPage;
