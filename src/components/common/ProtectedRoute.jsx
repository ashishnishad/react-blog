import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function ProtectedRoute({ children, roleCheck }) {
  const { token, role, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!token) return <Navigate to="/login" />;
  if (roleCheck && role !== roleCheck) return <Navigate to="/login" />;

  return children;
}
