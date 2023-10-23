import { useEffect, useState } from "react";
import { axiosProducts } from "../utils/axiosInstance";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState();

  useEffect(() => {
    axiosProducts.get(`/${productId}`).then((resp) => {
      const data = resp.data;
      setProductDetails(data);
    });
  }, [productDetails]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Product details of ID: {productId}</h1>
      <div
        style={{
          marginBottom: "120px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src={productDetails?.image} style={{ maxWidth: "150px" }} />
        <h3>{productDetails?.title}</h3>
        <h3>{productDetails?.price}</h3>
      </div>
    </div>
  );
};

export default ProductDetails;
