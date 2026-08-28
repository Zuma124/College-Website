import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';

import AuthProvider from '../providers/AuthProvider';

import useLocalStorage from 'use-local-storage';

import Login from '../pages/Login'
import Schedule from '../pages/Schedule';
import Electives from '../pages/Electives'; 
import Settings from '../pages/Settings'; 

export default function AppRoutes() {
  const [isDark] = useLocalStorage('isDark');
  
  return (
    <div data-theme={isDark ? "dark" : "light"}>

      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/electives" element={<Electives />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes> 
      </AuthProvider>

    </div>  
  );
};
