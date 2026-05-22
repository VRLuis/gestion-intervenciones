import { useState } from 'react';
import { AuthContext } from './AuthContext';
import { authService } from '../services/AuthService';

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    try { 
        return savedUser ? JSON.parse(savedUser) : null; 
    } catch { 
        return null; 
    }
  });

  const login = async (username, password) => {
    try {
      const result = await authService.login(username, password);
      
      if (result && result.success) {
        localStorage.setItem('user', JSON.stringify(result.data));
        setUser(result.data);
      }
      
      return result;
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || error.message || 'Credenciales inválidas.' 
      };
    }
  };

  const register = async (username, password) => {
    return await authService.register(username, password);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};