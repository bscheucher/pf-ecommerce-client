import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../services/AuthContext";
import { useCart } from "../../services/CartContext";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

function NavBar() {
  const navigate = useNavigate();
  const { isLoggedIn, logout, isAdmin } = useContext(AuthContext);
  const { cart } = useCart();
  const [queryContent, setQueryContent] = useState("");
  const [message, setMessage] = useState("");

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearchInProducts = (e) => {
    e.preventDefault();
    const query = queryContent.trim();
    if (query.length < 3) {
      setMessage("Query must be at least 3 characters long.");
      return;
    }
    setMessage("");
    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          My E-commerce Store
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Left Nav Links */}
          <Nav className="me-auto d-flex align-items-center gap-3">
            <Nav.Link as={Link} to="/" className="mx-2">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/products" className="mx-2">
              Products
            </Nav.Link>
            {isLoggedIn && (
              <Nav.Link as={Link} to="/cart" className="position-relative mx-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-cart cart-icon"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                </svg>
                {totalItems > 0 && (
                  <span className="cart-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {totalItems}
                  </span>
                )}
              </Nav.Link>
            )}
            {isAdmin && (
              <Nav.Link as={Link} to="/admin" className="mx-2">
                Admin
              </Nav.Link>
            )}
            {isLoggedIn && (
              <Nav.Link as={Link} to="/user" className="mx-2">
                User
              </Nav.Link>
            )}
          </Nav>

          {/* Search Form */}
          <form
            className="d-flex flex-column flex-md-row align-items-center mb-3 mb-md-0 w-100 w-md-auto"
            onSubmit={handleSearchInProducts}
          >
            <input
              type="search"
              className="form-control me-md-2 mb-2 mb-md-0 w-100 w-md-auto"
              onChange={(e) => setQueryContent(e.target.value)}
              value={queryContent}
              placeholder="Search..."
              aria-label="Search"
            />
            <button type="submit" className="btn btn-outline-secondary">
              Search
            </button>
            {message && <p className="text-danger mt-2 mb-0">{message}</p>}
          </form>

          {/* Auth Buttons */}
          <div className="d-grid d-lg-flex align-items-center gap-2">
            {isLoggedIn ? (
              <button
                onClick={logout}
                className="btn btn-outline-danger w-100 w-lg-auto"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn btn-outline-primary w-100 w-lg-auto"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary w-100 w-lg-auto"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
