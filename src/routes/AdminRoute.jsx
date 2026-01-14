import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role")?.toUpperCase();

  if (!token) {
    return <Navigate to="/" />;
  }

  if (role !== "ADMIN") {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default AdminRoute;
