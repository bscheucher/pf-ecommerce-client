import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../services/CartContext";
import ScrollToTopButton from "../components/Shared/ScrollTopButton";

function Cart() {
  const { cart, dispatch } = useCart();

  // const handleCheckout = () => {
  //   alert("Proceeding to checkout...");
  // };
  const navigate = useNavigate();

  return (
    <div className="container my-4">
      <h2 className="text-center">Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center mt-3">Your cart is empty.</p>
      ) : (
        <div className="row">
          {cart.map((item) => (
            <div key={item.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm h-100">
                <img
                  src={item.image_url}
                  className="card-img-top product-img p-3"
                  alt={item.name}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">Price: ${item.price}</p>
                  <p className="card-text">Quantity: {item.quantity}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      dispatch({ type: "REMOVE_FROM_CART", payload: item })
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="text-center mt-4">
          <h3 className="fw-bold">
            Total: €
            {cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
          </h3>
          <button
            className="btn btn-primary btn-lg mt-3"
            onClick={() => navigate("/checkout")}
          >
            Checkout
          </button>
        </div>
      )}
      <ScrollToTopButton />
    </div>
  );
}

export default Cart;
