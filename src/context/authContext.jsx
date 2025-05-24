import React, { createContext, useContext, useState } from 'react';
import axios from '../Api/axios/axios_config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (credentials) => {
    try {
      await axios.post('/user/loginUser',credentials , { withCredentials: true });
      setIsAuthenticated(true); 
    } catch (err) {
      console.error('Login failed', err);
      setIsAuthenticated(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post('/user/logoutUser', {}, { withCredentials: true });
    } catch (err) {
      console.error('Logout error', err);
    } finally {
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
