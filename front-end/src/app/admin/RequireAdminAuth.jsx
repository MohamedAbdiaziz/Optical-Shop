// /front-end/src/app/admin/RequireAdminAuth.jsx
import { Navigate } from 'react-router-dom';

export default function RequireAdminAuth({ children }) {
  const token = localStorage.getItem('adminToken');

  return token ? children : <Navigate to="/admin/login" replace />;
}
