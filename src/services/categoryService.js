import API from "./api";

export const addCategory = (categoryData) =>
  API.post("/categories/add", categoryData);
export const getCategoryById = (categoryId) =>
  API.get(`/categories/${categoryId}`);
export const listCategories = () => API.get("/categories");
export const updateCategory = (categoryId, categoryData) =>
  API.put(`/categories/${categoryId}`, categoryData);
export const deleteCategory = (categoryId) =>
  API.delete(`/categories/${categoryId}/delete`);
export const addCategoryToProduct = (data) =>
  API.post("/categories/add-to-product", data);
export const detachCategoryFromProduct = (data) =>
  API.delete("categories/remove-from-product", data);
export const getProductCategories = (productId) =>
  API.get(`/categories/of-product/${productId}`);
export const getCategoryProducts = (categoryId) =>
  API.get(`/categories/${categoryId}/products`);
