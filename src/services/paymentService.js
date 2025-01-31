import API from "./api";

export const addPayment = (paymentData) => API.post("/payments/add", paymentData);
export const getPayment = (paymentId) => API.get(`/payments/${paymentId}`);
export const getOrderPayments = (orderId) => API.get(`/payments/of-order/${orderId}`);
export const updatePaymentStatus = (paymentId, paymentData) =>
  API.put(`/payments/${paymentId}`, paymentData);
