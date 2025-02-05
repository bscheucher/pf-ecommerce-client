import React from "react";

function AddressSelector({
  userAddresses,
  selectedAddressId,
  onAddressChange,
}) {
  return (
    userAddresses.length > 0 && (
      <>
        <label>Select an Address:</label>
        <select
          className="form-control mb-3 address-select"
          onChange={onAddressChange}
          value={selectedAddressId}
        >
          <option value="new" className="address-select">
            Use a new address
          </option>
          {userAddresses.map((address) => (
            <option key={address.id} value={address.id}>
              {address.street_address}, {address.city}, {address.country}
            </option>
          ))}
        </select>
      </>
    )
  );
}

export default AddressSelector;
