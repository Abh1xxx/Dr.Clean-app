import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { user } = useAuth();

  // Not logged in
  if (!user) return <Navigate to="/login" />;

  // Role restriction
  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
}