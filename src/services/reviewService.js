import API from "./api";

export const addReview = (reviewData) => API.post("/reviews/add", reviewData);
export const getReviews = (productId) =>
  API.get(`/reviews/of-product/${productId}`);
export const updateReview = (reviewId, reviewData) =>
  API.put(`/reviews/${reviewId}`, reviewData);
export const deleteReview = (reviewId) =>
  API.delete(`/reviews/${reviewId}/delete`);
