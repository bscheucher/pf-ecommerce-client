import API from "./api";

export const registerUser = (userData) => API.post("/users/register", userData);
export const updateUser = (userId, userData) =>
  API.put(`/users/${userId}/update`, userData);
export const loginUser = async (credentials) => API.post("/users/login", credentials);
export const getUserById = (userId) => API.get(`/users/${userId}/`);
