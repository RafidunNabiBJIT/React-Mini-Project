import { Navigate, useNavigate } from "react-router-dom";
import "../css/flexDirectionColumn.css";
import "../css/card.css";
import userImg from "/images/user2.png";
import bookImg from "/images/book4.avif";
import admin6 from "/images/admin6.jpg";
import useProductHook from "../hooks/useProductHook";
import AllProductListForAdmin from "../components/allProductListForAdmin";
function AdminPanel() {
  const navigate = useNavigate();
  const {
    cart,
    products,
    loading,
    addToCart,
    addToFavorites,
    removeItem,
    showAllProducts,
    fetchProducts,
  } = useProductHook();
  return (
    <div className="flex-column" style={{ marginTop: "50px" }}>
      <div style={{ flexDirection: "column", marginBottom: "70px" }}>
        <h1>
          Welcome to the <span style={{ color: "#FF6347" }}>Admin</span> Panel
        </h1>
        <h5>
          View user details. Create, Modify and Delete Books as you like.As an
          admin you have full control over this section.
        </h5>
      </div>
      <div className="whole-container">
        <img
          src={admin6}
          alt="Cart Image"
          style={{
            height: "500px",
            width: "880px",
            borderRadius: "5px",
            marginRight: "100px",
          }}
        />
      </div>

      <h2 style={{ marginLeft: "20px" }}>Operations</h2>
      <div
        className="whole-container"
        style={{
          marginBottom: "10px",
          flexWrap: "wrap",
          border: "2px solid #ededed",
          borderRadius: "12px",
          padding: "60px",
          width: "1100px",
        }}
      >
        <div
          className="card whole-container"
          style={{ height: "280px", width: "280px", flexDirection: "row" }}
        >
          <img
            src={userImg}
            alt="Cart Image"
            style={{
              borderRadius: "14px 0 0 14px",
              width: "200px",
              height: "200px",
            }}
          />
          <button
            onClick={() => navigate("/adminPanelAllUser")}
            className="orange-button"
            style={{ width: "140px" }}
          >
            User Info
          </button>
        </div>

        <div
          className="card"
          style={{ height: "280px", width: "280px", flexDirection: "row" }}
        >
          <img
            src={bookImg}
            alt="Cart Image"
            style={{
              borderRadius: "14px 0 0 14px",
              width: "180px",
              height: "180px",
            }}
          />
          <button
            onClick={() => navigate("/createBook")}
            className="orange-button"
            style={{ width: "140px", marginTop: "24px" }}
          >
            Create Books
          </button>
        </div>
        <div
          className="card whole-container"
          style={{ height: "280px", width: "280px" }}
        >
          <button
            onClick={() => navigate("/adminPanelAllUser")}
            className="orange-button"
            style={{ width: "200px", height: "35px", marginTop: "100px" }}
          >
            User Information
          </button>
        </div>

        <div
          className="card whole-container"
          style={{ height: "280px", width: "280px" }}
        >
          <button
            onClick={() => navigate("/createBook")}
            className="orange-button"
            style={{ width: "200px", height: "35px" }}
          >
            Modify Books
          </button>
        </div>
      </div>
      <div>
        <h1>Books</h1>
      </div>
      <div className="whole-container">
        <AllProductListForAdmin
          products={products}
          fetchProducts={fetchProducts}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default AdminPanel;
