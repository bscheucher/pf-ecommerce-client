import API from "./api";

export const addOrder = (orderData) => API.post("/orders/add", orderData);
export const getOrder = (orderId) => API.get(`/orders/${orderId}`);
export const getUserOrders = (userId) => API.get(`/orders/of-user/${userId}`);
export const updateOrder = (orderId, orderData) =>
  API.put(`/orders/${orderId}`, orderData);
export const deleteOrder = (orderId) => API.delete(`/orders/${orderId}`);
