// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { fetchUserProfile } from '../services/authService';
import { useLocation } from 'react-router-dom';

// Membuat context untuk autentikasi
const AuthContext = createContext();

// Daftar route yang bisa diakses tanpa login
const publicRoutes = ['/login'];

// Provider komponen untuk mengelola state autentikasi
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Effect untuk mengecek status user setiap kali route berubah
  useEffect(() => {
    const checkUser = async () => {
      const isPublicRoute = publicRoutes.includes(location.pathname);

      if (isPublicRoute) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const data = await fetchUserProfile();
        setUser(data.user);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [location.pathname]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook untuk mengakses context autentikasi
export const useAuth = () => useContext(AuthContext);
