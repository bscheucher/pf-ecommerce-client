import React from "react";

function AddressForm({ formData, onChange, disabled }) {
  return (
    <>
      <input
        type="text"
        name="fullName"
        className="form-control mb-2"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={onChange}
        required
        disabled={disabled}
      />
      <input
        type="text"
        name="streetAddress"
        className="form-control mb-2"
        placeholder="Street Address"
        value={formData.streetAddress}
        onChange={onChange}
        required
        disabled={disabled}
      />
      <input
        type="text"
        name="city"
        className="form-control mb-2"
        placeholder="City"
        value={formData.city}
        onChange={onChange}
        required
        disabled={disabled}
      />
      <input
        type="text"
        name="state"
        className="form-control mb-2"
        placeholder="State"
        value={formData.state}
        onChange={onChange}
        disabled={disabled}
      />
      <input
        type="text"
        name="postalCode"
        className="form-control mb-2"
        placeholder="Postal Code"
        value={formData.postalCode}
        onChange={onChange}
        disabled={disabled}
      />
      <input
        type="text"
        name="country"
        className="form-control mb-2"
        placeholder="Country"
        value={formData.country}
        onChange={onChange}
        required
        disabled={disabled}
      />
      <input
        type="text"
        name="phoneNumber"
        className="form-control mb-2"
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={onChange}
        disabled={disabled}
      />
    </>
  );
}

export default AddressForm;
