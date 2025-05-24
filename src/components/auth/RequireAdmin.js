// RequireAdmin.jsx
import { Navigate, Outlet } from 'react-router-dom';

// Komponen untuk memastikan user memiliki role admin sebelum mengakses halaman tertentu
const RequireAdmin = () => {
  const role = localStorage.getItem('role');
  return role === 'admin' ? <Outlet /> : <Navigate to="/vote/create" />;
};

export default RequireAdmin;
