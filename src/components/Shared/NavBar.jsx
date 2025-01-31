import React, { useContext } from "react";
import { AuthContext } from "../../services/AuthContext";
import { useCart } from "../../services/CartContext";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

function NavBar() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const { cart } = useCart();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          My E-commerce Store
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/products">
              Products
            </Nav.Link>
            {isLoggedIn && (
              <Nav.Link as={Link} to="/cart" className="position-relative">
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
                  <span className="cart-badge">{totalItems}</span>
                )}
              </Nav.Link>
            )}
          </Nav>
          <div className="d-flex flex-column flex-lg-row align-items-center gap-2">
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
