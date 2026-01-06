import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  // Fix: localStorage.getItem only takes one argument.
  const storedRole = localStorage.getItem("role");

  // Normalize roles to lowercase for comparison
  const role = storedRole ? storedRole.toLowerCase() : null;
  const required = requiredRole ? requiredRole.toLowerCase() : null;

  // If no role (not logged in)
  if (!role) {
    return <Navigate to="/register" replace />;
  }

  // If role is not the required one
  if (role !== required) {
    if (role === "customer") {
      return <Navigate to="/customer/membership" replace />;
    } else if (role === "admin") {
      // Avoid infinite loop: Only redirect if matching the other role logic
      // But if we are here, it means role !== required. 
      // If role is admin, required must have been something else (e.g. customer).
      // So it is safe to redirect to admin dashboard.
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  // Role matches required → allow access
  return children;
};

export default ProtectedRoute;


