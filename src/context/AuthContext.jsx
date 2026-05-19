import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loginUser, registerUser } from '../api/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // loading during init

  // ─── Initialize from localStorage ──────────────────────────────────────────
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('vault_token');
      const storedUser = localStorage.getItem('vault_user');

      if (storedToken && storedUser) {
        try {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          
          // Import dynamically to avoid circular dependencies if any, though regular import is fine.
          const { getUserProfile } = await import('../api/userService');
          const data = await getUserProfile();
          if (data.success && data.data) {
            setUser(data.data);
            localStorage.setItem('vault_user', JSON.stringify(data.data));
          }
        } catch (err) {
          console.error('Session refresh failed:', err);
          if (err.response?.status === 401) {
            localStorage.removeItem('vault_token');
            localStorage.removeItem('vault_user');
            setToken(null);
            setUser(null);
          }
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  // ─── Persist to localStorage whenever user/token changes ───────────────────
  const persistSession = (userData, jwtToken) => {
    localStorage.setItem('vault_token', jwtToken);
    localStorage.setItem('vault_user', JSON.stringify(userData));
    setToken(jwtToken);
    setUser(userData);
  };

  // ─── Login ──────────────────────────────────────────────────────────────────
  const login = useCallback(async (email, password) => {
    const response = await loginUser(email, password);
    const { data } = response;
    persistSession(data, data.token);
    return response;
  }, []);

  // ─── Register ───────────────────────────────────────────────────────────────
  const register = useCallback(async (name, email, password) => {
    const response = await registerUser(name, email, password);
    const { data } = response;
    persistSession(data, data.token);
    return response;
  }, []);

  // ─── Logout ─────────────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    localStorage.removeItem('vault_token');
    localStorage.removeItem('vault_user');
    setToken(null);
    setUser(null);
  }, []);

  // ─── Update stored user (e.g., after profile update) ────────────────────────
  const updateUser = useCallback((updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('vault_user', JSON.stringify(updatedUser));
  }, []);

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, isLoading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside an <AuthProvider>');
  }
  return context;
};

export default AuthContext;
