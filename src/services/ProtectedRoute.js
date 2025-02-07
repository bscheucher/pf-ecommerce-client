import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ element }) => {
  const { isLoggedIn } = useContext(AuthContext);
  
  return isLoggedIn ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
