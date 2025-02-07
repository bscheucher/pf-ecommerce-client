import axios from "axios";

const API = axios.create({
  baseURL: "https://pf-ecommerce-server.onrender.com/api",

  withCredentials: true,
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("Token in Client:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
