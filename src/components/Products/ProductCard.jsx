import React, { useContext } from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../../services/CartContext";
import { AuthContext } from "../../services/AuthContext";
import { deleteProduct } from "../../services/productService";

function ProductCard({ product }) {
  const productId = product.id;
  const { dispatch } = useCart();
  const { isLoggedIn, isAdmin } = useContext(AuthContext);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      alert("You must be logged in to add items to the cart.");
      return;
    }
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const handleDeleteProduct = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await deleteProduct(productId);
      alert("Product deleted successfully.");
      // Redirect to another page, e.g., home or products list
      window.location.href = "/";
    } catch (error) {
      console.error("Failed to delete product:", error.message);
      alert("An error occurred while deleting the product.");
    }
  };

  return (
    <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
      <div className="card my-1 p-3 bg-white shadow rounded-lg overflow-hidden product-card">
        <div className="card-img-top d-flex justify-content-center align-items-center h-1">
          <img
            src={product.image_url}
            alt={product.name}
            className="product-img"
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">{product.description}</p>
          <p className="card-text">Price: €{product.price}</p>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>

          <Link
            role="button"
            to={`/products/${productId.toString()}`}
            className="product-detail-btn"
          >
            Details
          </Link>

          {isAdmin && (
            <>
              <Link
                role="button"
                to={`/products/${productId.toString()}/update`}
                className="product-update-btn"
              >
                Update
              </Link>
              <button
                className="product-delete-btn"
                onClick={handleDeleteProduct}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </Col>
  );
}

export default ProductCard;
