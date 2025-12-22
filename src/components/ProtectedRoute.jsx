import { Navigate } from 'react-router-dom';
import { isAuthenticated, getRole } from '../utils/auth';

export default function ProtectedRoute({ children, roles }) {
  if (!isAuthenticated()) return <Navigate to="/login" />;
  if (roles && !roles.includes(getRole())) return <Navigate to="/" />;
  return children;
}
