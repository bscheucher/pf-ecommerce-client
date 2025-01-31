import API from "./api";

export const addAddress = (addressData) =>
    API.post("/addresses/add", addressData);
  export const getAddressById = (addressId) => API.get(`/addresses/${addressId}`);
  export const getUserAddresses = (userId) => API.get(`/addresses/${userId}`)
  export const updateAddress = (addressId, addressData) =>
    API.put(`/addresses/${addressId}`, addressData);
  export const deleteAddress = (addressId) =>
    API.delete(`/addresses/${addressId}/delete`);