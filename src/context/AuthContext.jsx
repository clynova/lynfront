import { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import api from '../services/api';
import { logout as logoutService } from '../services/authService';
import { syncCart, getCart } from '../services/paymentService';
import { getProductById } from '../services/productService';
import LoadingOverlay from '../components/Loading/LoadingOverlay';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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
      
      // Get local cart
      const localCart = JSON.parse(localStorage.getItem('cart')) || [];
      
      try {
        if (localCart.length > 0) {
          // Si hay productos en el carrito local, sincronizarlos con el servidor
          await syncCart(localCart, token);
        } else {
          // Si el carrito local está vacío, cargar el carrito del servidor
          const serverCartResponse = await getCart(token);
          if (serverCartResponse && serverCartResponse.cart && serverCartResponse.cart.products && 
              serverCartResponse.cart.products.length > 0) {
              
            // Obtener detalles completos de cada producto
            const cartItemsWithDetails = [];
            for (const item of serverCartResponse.cart.products) {
              try {
                // Obtener detalles del producto
                const productDetails = await getProductById(item.productId);
                
                if (productDetails && productDetails.product) {
                  // Asegurar que tenemos todas las propiedades requeridas
                  const product = productDetails.product;
                  
                  // Verificar que los datos esenciales estén presentes
                  if (!product.name || !product.images || !product.price) {
                    console.warn(`Producto ${item.productId} con datos incompletos:`, product);
                    continue; // Saltamos este producto si falta alguna propiedad esencial
                  }
                  
                  cartItemsWithDetails.push({
                    _id: item.productId,
                    name: product.name,
                    price: product.price,
                    images: product.images || ['placeholder.png'], // Usar imagen placeholder si no hay imágenes
                    quantity: item.quantity,
                    stock: product.stock || 0,
                    // Añadir cualquier otra propiedad necesaria
                    ...product
                  });
                }
              } catch (error) {
                console.error(`Error al obtener detalles del producto ${item.productId}:`, error);
              }
            }
            
            // Guardar en localStorage solo si tenemos productos válidos
            if (cartItemsWithDetails.length > 0) {
              localStorage.setItem('cart', JSON.stringify(cartItemsWithDetails));
            }
          }
        }
      } catch (error) {
        console.error('Error sincronizando el carrito después del login:', error);
      }
    } catch (error) {
      console.error('Error durante el login:', error);
      throw error;
    }
  };

  const logout = async () => {
    setIsLoggingOut(true);
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await logoutService(token);
      }
    } catch (error) {
      console.error('Error durante el logout:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setToken(null);
      setUser(null);
      setIsLoggingOut(false);
    }
  };

  if (loading) {
    return <LoadingOverlay message="Verificando autenticación..." />;
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      login, 
      logout, 
      setUser,
      isAuthenticated: !!user,
      isLoggingOut
    }}>
      {isLoggingOut && <LoadingOverlay message="Cerrando sesión..." />}
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};
