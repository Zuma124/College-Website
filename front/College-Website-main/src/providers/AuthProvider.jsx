import api from '../services/api/axios';
import React, { useContext, createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await api.post('login/', {
        email: email,
        password: password
      });

      const userData = response.data.user;
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData)); 
      
      navigate('/schedule');
    }
    catch (error) {
      toast.error(error.response?.data?.non_field_errors || 'Виникла помилка при вході в обліковий запис.');
      console.error('Login error:', error.response?.data);
    }
  };

  const logout = async () => {
    try {
      await api.post('logout/');

      localStorage.removeItem('user');
      setUser(null);

      navigate('/login');
      document.title = 'Увійдіть в обліковий запис - ВСП "Фаховий коледж ЧНУ"';
    }
    catch (error) {
      toast.error(error.response?.data?.non_field_errors || 'Виникла помилка при виході з облікового запису.');
      console.error('Logout error:', error.response?.data);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);