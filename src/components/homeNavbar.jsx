import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import "../css/searchButton.css"; // Import your custom CSS file
import "../css/navlink.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ColorSchemesExample() {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const navigate = useNavigate();
  const [role, setUserRole] = useState(localStorage.getItem("role"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    setUserRole(localStorage.getItem("role"));
  }, []);
  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible);
  };
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home" className="nav-link">
          Navbar
        </Navbar.Brand>

        <Nav className="me-auto">
          {console.log("Eita kinty token:", token)}
          {console.log("Eita kintu role:", role)}
          {/* {!token && (
            <Link to="/" className="mr-3 nav-link">
              Home
            </Link>
          )}
          {token && role === "ADMIN" && (
            <Link to="/" className="mr-3 nav-link">
              Home
            </Link>
          )} */}
          {token && role === "ADMIN" && (
            <Link to="/adminPanel" className="mr-3 nav-link">
              Admin Panel
            </Link>
          )}
          {token && role === "CUSTOMER" && (
            <Link to="/home" className="mr-3 nav-link">
              Home
            </Link>
          )}
        </Nav>

        <div className="search-container">
          <div className="search-inner-container">
            {/* <input
              type="text"
              className={`search-input ${isSearchVisible ? "visible" : ""}`}
              placeholder="Search"
            />
            <Button
              variant="outline-dark"
              onClick={() => {
                navigate("/search");
              }}
              className="search-button"
            >
              <i className="bi bi-search text-white ml-5"></i>
            </Button> */}

            {!token && (
              <>
                <Nav>
                  <Link
                    to="/register"
                    className="mr-3 nav-link"
                    style={{ color: "white" }}
                  >
                    Sign Up
                  </Link>
                </Nav>
                <Nav>
                  <Link
                    to="/login"
                    className="mr-3 nav-link"
                    style={{ color: "white" }}
                  >
                    Login
                  </Link>
                </Nav>
              </>
            )}

            <Nav>
              {token && (
                <button
                  className="mr-3 nav-link"
                  style={{ color: "white" }}
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("role");
                    localStorage.removeItem("id");
                    navigate("/login");
                  }}
                >
                  Logout
                </button>
              )}
            </Nav>
          </div>
        </div>
      </Container>
    </Navbar>
  );
}

export default ColorSchemesExample;
