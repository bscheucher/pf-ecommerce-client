import React from "react";

function OrderSummary({ cart, totalAmount }) {
  return (
    <div className="mt-4 p-3 border rounded">
      <h5>Order Summary</h5>
      {cart.map((item) => (
        <div key={item.id}>
          <p>
            {item.name} x {item.quantity} = €{item.price * item.quantity}
          </p>
        </div>
      ))}
      <h5 className="fw-bold">Total: ${totalAmount.toFixed(2)}</h5>
    </div>
  );
}

export default OrderSummary;
