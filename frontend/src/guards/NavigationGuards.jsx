import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Comprueba que hay una sesión activa y si no la hay te redirige al login
 * @returns 
 */
export const PrivateGuard = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

/**
 * Comrprueba que hay una sesión activa y si la hay no te deja ver registro y login
 * @returns 
 */
export const PublicGuard = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/intervention" replace />;
  }

  return <Outlet />;
};