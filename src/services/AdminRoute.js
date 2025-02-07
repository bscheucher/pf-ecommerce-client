import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const AdminRoute = ({ element }) => {
  const { isLoggedIn, isAdmin } = useContext(AuthContext);
  
  return isLoggedIn && isAdmin ? element : <Navigate to="/" />;
};

export default AdminRoute;
