import API from "./api";

export const addProduct = (productData) =>
  API.post("/products/add", productData);
export const getProductById = (productId) => API.get(`/products/${productId}`);
export const getAllProducts = () => API.get("/products");
export const updateProduct = (productId, productData) =>
  API.put(`/products/${productId}`, productData);
export const deleteProduct = (productId) =>
  API.delete(`/products/${productId}/delete`);
