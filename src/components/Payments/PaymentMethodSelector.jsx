import React from "react";

function PaymentMethodSelector({ paymentMethod, onChange }) {
  return (
    <>
      <h4>Payment Method</h4>
      <select
        name="paymentMethod"
        className="form-control"
        onChange={onChange}
        value={paymentMethod}
      >
        <option>Credit Card</option>
        <option>PayPal</option>
        <option>Bank Transfer</option>
      </select>
    </>
  );
}

export default PaymentMethodSelector;
