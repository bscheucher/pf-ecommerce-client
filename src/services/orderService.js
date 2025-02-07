import API from "./api";

export const listOrders = () => API.get("/orders");
export const addOrder = (orderData) => API.post("/orders/add", orderData);
export const getOrder = (orderId) => API.get(`/orders/${orderId}`);
export const getUserOrders = (userId) => API.get(`/orders/of-user/${userId}`);
export const updateOrder = (orderId, status) =>
  API.put(`/orders/${orderId}`, status);
export const deleteOrder = (orderId) => API.delete(`/orders/${orderId}`);
