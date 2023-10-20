import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import "../css/searchButton.css"; // Import your custom CSS file
import "../css/navlink.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ColorSchemesExample() {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

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
          <Link to="/" className="mr-3 nav-link">
            Home
          </Link>

          {token && (
            <>
              <Link
                to="/addproduct"
                className="mr-3 nav-link"
                style={{ color: "white" }}
              >
                Add Product
              </Link>
            </>
          )}
          <Nav.Link href="#pricing" className="mr-3 nav-link">
            Pricing
          </Nav.Link>
        </Nav>
        <div className="search-container">
          <div className="search-inner-container">
            <input
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
            </Button>

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
