import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // Add isAdmin state
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Extract token from localStorage before the useEffect runs
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);

        if (decoded.exp * 1000 > Date.now()) {
          setUserId(decoded.id || "");
          setIsAdmin(decoded.isAdmin || false); // Set isAdmin from the token
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem("token");
          setUserId("");
          setIsAdmin(false); // Reset isAdmin if the token is expired
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error decoding token:", error.message);
        localStorage.removeItem("token");
        setUserId("");
        setIsAdmin(false); // Reset isAdmin if there's an error decoding the token
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false); // Reset isAdmin if no token is found
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem(`cart_${userId}`); // Clear the user's cart on logout
    setUserId("");
    setIsAdmin(false); // Reset isAdmin on logout
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userId, isAdmin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
