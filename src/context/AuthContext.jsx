import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../services/api';
import { logout as logoutService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        try {
          const response = await api.get(`${import.meta.env.VITE_API_URL}/api/user/validate-token`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setUser(response.data.user);
          localStorage.setItem('user', JSON.stringify(response.data.user));
        } catch (error) {
          console.log(error)
          logout();
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    validateToken();
  }, [token]);

  const login = async (credentials) => {
    try {
      const response = await api.post(`${import.meta.env.VITE_API_URL}/api/user/autenticar`, credentials);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setToken(token);
      setUser(user);
    } catch (error) {
      console.error('Error durante el login:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await logoutService(token);
      }
    } catch (error) {
      console.error('Error durante el logout:', error);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  if (loading) {
    return <div>Cargando...</div>; // O tu componente de loading
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      login, 
      logout, 
      setUser,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};


AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};
export const useAuth = () => useContext(AuthContext);
