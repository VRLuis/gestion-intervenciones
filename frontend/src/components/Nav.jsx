import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Nav = () => {
  const { logout } = useAuth();

  const activeClass = "bg-gray-100 text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors";
  const inactiveClass = "text-gray-600 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors";

  return (
    <nav className="bg-white border-b border-gray-200 w-full shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <div className="flex space-x-4 items-center">
            <div className="flex-shrink-0 font-bold text-gray-800 text-lg mr-4">Gestión App</div>
            <NavLink to="/intervention" className={({ isActive }) => isActive ? activeClass : inactiveClass} end>
              Intervenciones
            </NavLink>
            <NavLink to="intervention/new" className={({ isActive }) => isActive ? activeClass : inactiveClass}>
              Crear nueva intervención
            </NavLink>
          </div>

          <div className="flex items-center">
            <button
              onClick={logout}
              className="ml-4 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors shadow-sm cursor-pointer"
            >
              Cerrar sesión
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};