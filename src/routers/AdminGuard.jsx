import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const role = localStorage.getItem("role");

  // If no role (not logged in)
  if (!role) {
    return <Navigate to="/register"  />;
  }

  // If role is not the required one → redirect to correct dashboard
  if (role !== requiredRole) {
    if (role === "customer") {
      return <Navigate to="/customer/membership" replace />;
    } else if (role === "Admin") {
      return <Navigate to="/" replace />;
    } else {
      
      return <Navigate to="/register" replace />;
    }
  }

  // Role matches required → allow access
  return children;
};

export default ProtectedRoute;