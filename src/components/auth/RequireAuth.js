// RequireAuth.jsx
import { Navigate, Outlet } from 'react-router-dom';

// Komponen untuk memastikan user sudah login sebelum mengakses halaman tertentu
const RequireAuth = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default RequireAuth;
