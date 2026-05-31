import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Load token from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('jwt_token');
    if (storedToken) {
      setToken(storedToken);
      const payload = JSON.parse(atob(storedToken.split('.')[1]));
      setUser({ id: payload.id, role: payload.role, name: payload.name });
    }
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    if (res.data.success) {
      const jwt = res.data.token;
      localStorage.setItem('jwt_token', jwt);
      setToken(jwt);
      const payload = JSON.parse(atob(jwt.split('.')[1]));
      setUser({ id: payload.id, role: payload.role, name: payload.name });
    }
    return res;
  };

  const register = async (name, email, password, role) => {
    const res = await api.post('/auth/register', { name, email, password, role });
    if (res.data.success) {
      const jwt = res.data.token;
      localStorage.setItem('jwt_token', jwt);
      setToken(jwt);
      const payload = JSON.parse(atob(jwt.split('.')[1]));
      setUser({ id: payload.id, role: payload.role, name: payload.name });
    }
    return res;
  };

  const logout = () => {
    localStorage.removeItem('jwt_token');
    setToken(null);
    setUser(null);
    navigate('/');
  };

  const value = { user, token, login, register, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
