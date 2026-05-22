import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { PrivateGuard, PublicGuard } from './guards/NavigationGuards';
import { Nav } from './components/Nav';

import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Intervention } from './pages/Intervention';
import { NewIntervention } from './pages/NewIntervention';

const PrivateLayout = () => {
    return (
        <>
            <Nav />
            <main className="max-w-7xl mx-auto p-6">
                <Outlet />
            </main>
        </>
    );
};

export const AppRoutes = () => {
  return (
    <Routes>

        <Route element={<PublicGuard />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<PrivateGuard />}>
            <Route element={<PrivateLayout />}>
                <Route path="/intervention" element={<Intervention/>} /> 
                <Route path="/intervention/new" element={<NewIntervention/>} />
            </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;