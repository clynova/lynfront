import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import { useAuth } from './AuthContext';
import { addToCart as addToCartAPI, removeFromCart as removeFromCartAPI, 
         getCart, syncCart, clearCart as clearCartAPI } from '../services/paymentService';
import { getProductById } from '../services/productService';

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { token, isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [shippingInfo, setShippingInfo] = useState(() => {
    const savedInfo = localStorage.getItem('shippingInfo');
    return savedInfo ? JSON.parse(savedInfo) : null;
  });

  const [paymentInfo, setPaymentInfo] = useState(() => {
    const savedInfo = localStorage.getItem('paymentInfo');
    return savedInfo ? JSON.parse(savedInfo) : null;
  });

  // Effect to load cart from API when user is authenticated
  useEffect(() => {
    const fetchCartFromAPI = async () => {
      if (isAuthenticated && token) {
        setIsLoading(true);
        try {
          // Primero obtenemos el carrito del servidor para verificar el estado actual
          let serverCartResponse;
          try {
            serverCartResponse = await getCart(token);
          } catch (error) {
            console.log('No se pudo obtener el carrito del servidor:', error);
            serverCartResponse = { cart: { products: [] } };
          }

          // Obtenemos el carrito local
          const localCart = JSON.parse(localStorage.getItem('cart')) || [];
          
          // Verificamos si ya hay una sincronización en progreso (para evitar múltiples en recargas)
          const lastSyncTime = localStorage.getItem('lastCartSync');
          const now = Date.now();
          
          // Si se ha sincronizado en los últimos 2 segundos, no volvemos a sincronizar
          // Esto evita sincronizaciones múltiples en recargas rápidas (F5)
          if (lastSyncTime && (now - parseInt(lastSyncTime)) < 2000) {
            console.log('Sincronización reciente detectada, usando carrito del servidor');
            
            // Si hay un carrito en el servidor, lo cargamos
            if (serverCartResponse?.cart?.products && serverCartResponse.cart.products.length > 0) {
              await loadServerCart(serverCartResponse);
            }
            
            setIsLoading(false);
            return;
          }
          
          // Marcamos el tiempo de sincronización
          localStorage.setItem('lastCartSync', now.toString());
          
          // Continuamos con la lógica existente
          if (localCart.length > 0) {
            await syncCart(localCart, token);
          } else {
            try {
              // Si el carrito local está vacío pero hay productos en el servidor, los cargamos
              if (serverCartResponse?.cart?.products && serverCartResponse.cart.products.length > 0) {
                await loadServerCart(serverCartResponse);
              }
            } catch (getCartError) {
              console.log('No se pudo cargar el carrito, posiblemente sea un usuario nuevo:', getCartError);
            }
          }
        } catch (error) {
          console.error('Error fetchCartFromAPI:', error);
          if (error?.response?.status !== 400) {
            toast.error('Error al cargar tu carrito');
          }
        } finally {
          setIsLoading(false);
        }
      } else if (!isAuthenticated) {
        const savedCart = localStorage.getItem('cart');
        if (savedCart && cartItems.length === 0) {
          setCartItems(JSON.parse(savedCart));
        }
      }
    };

    // Función auxiliar para cargar el carrito del servidor
    const loadServerCart = async (serverCartResponse) => {
      // Cargar los detalles completos de cada producto
      const serverCartItems = [];
      
      for (const item of serverCartResponse.cart.products) {
        try {
          // Obtener detalles del producto
          const productDetails = await getProductById(item.productId);
          
          if (productDetails && productDetails.product) {
            const product = productDetails.product;
            
            // Asegurar que el producto tiene todos los datos necesarios
            if (!product.name || !product.images || product.price === undefined) {
              console.warn(`Producto ${item.productId} con datos incompletos:`, product);
              try {
                await removeFromCartAPI(item.productId, token);
                console.log(`Producto defectuoso ${item.productId} eliminado del carrito`);
              } catch (removeError) {
                console.error(`Error al eliminar producto defectuoso ${item.productId}:`, removeError);
              }
              continue; 
            }
            
            // Crear objeto de carrito completo
            serverCartItems.push({
              _id: item.productId,
              name: product.name,
              price: product.price,
              images: Array.isArray(product.images) ? product.images : ['placeholder.png'],
              quantity: item.quantity,
              stock: product.stock || 1,
              ...product
            });
          }
        } catch (error) {
          console.error(`Error al obtener detalles del producto ${item.productId}:`, error);
          try {
            await removeFromCartAPI(item.productId, token);
            console.log(`Producto problemático ${item.productId} eliminado del carrito`);
          } catch (removeError) {
            console.error(`Error al eliminar producto problemático ${item.productId}:`, removeError);
          }
        }
      }
      
      if (serverCartItems.length > 0) {
        setCartItems(serverCartItems);
        localStorage.setItem('cart', JSON.stringify(serverCartItems));
        
        if (serverCartItems.length < serverCartResponse.cart.products.length) {
          toast.success('Se ha limpiado tu carrito de productos no disponibles');
        } else {
          toast.success('Se ha cargado tu carrito guardado');
        }
      } else if (serverCartResponse.cart.products.length > 0) {
        // Si no pudimos cargar ningún producto pero había productos en el carrito
        // Limpiamos el carrito del servidor ya que los productos son inválidos
        await clearCartAPI(token);
        toast.error('Hubo un problema con los productos en tu carrito y ha sido limpiado');
      }
    };

    fetchCartFromAPI();
  }, [isAuthenticated, token]);

  // Efecto para limpiar el estado del carrito cuando el usuario cierra sesión
  useEffect(() => {
    if (!isAuthenticated) {
      // Si el usuario no está autenticado, nos aseguramos que el estado del carrito
      // refleja solo lo que hay en localStorage (que se limpia en el logout del AuthContext)
      const savedCart = localStorage.getItem('cart');
      setCartItems(savedCart ? JSON.parse(savedCart) : []);
    }
  }, [isAuthenticated]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (shippingInfo) {
      localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
    }
  }, [shippingInfo]);

  useEffect(() => {
    if (paymentInfo) {
      localStorage.setItem('paymentInfo', JSON.stringify(paymentInfo));
    }
  }, [paymentInfo]);

  const validateStock = (product, requestedQuantity) => {
    if (requestedQuantity > product.stock) {
      toast.error(`Solo hay ${product.stock} unidades disponibles de ${product.name}`);
      return false;
    }
    return true;
  };

  const addToCart = async (product) => {
    try {
      const existingItem = cartItems.find(item => item._id === product._id);
      const newQuantity = existingItem ? existingItem.quantity + 1 : 1;
      
      if (!validateStock(product, newQuantity)) {
        return;
      }
      
      // Update local state immediately for better UX
      setCartItems(curr => {
        if (existingItem) {
          return curr.map(item =>
            item._id === product._id
              ? { ...item, quantity: newQuantity }
              : item
          );
        }
        return [...curr, { ...product, quantity: 1 }];
      });
      
      // If authenticated, sync with server
      if (isAuthenticated && token) {
        try {
          // Verificar si el producto ya existe en el carrito del servidor
          let serverCart;
          try {
            serverCart = await getCart(token);
          } catch (error) {
            console.log("No se pudo obtener el carrito del servidor:", error);
            // Si hay error al obtener el carrito, asumimos que no existe y continuamos con la adición
            serverCart = { cart: { products: [] } };
          }
          
          // Buscar si el producto ya existe en el carrito del servidor
          const existingServerItem = serverCart?.cart?.products?.find(item => 
            item.productId === product._id
          );
          
          // Si el producto ya existe en el servidor, primero lo eliminamos para evitar duplicados
          if (existingServerItem) {
            try {
              await removeFromCartAPI(product._id, token);
            } catch (removeError) {
              console.error("Error al eliminar producto existente:", removeError);
              // Continuamos con la adición aunque haya error al eliminar
            }
          }
          
          // Ahora agregamos el producto con la cantidad actualizada
          await addToCartAPI({ 
            productId: product._id, 
            quantity: newQuantity 
          }, token);
        } catch (error) {
          // Revert local state if API call fails
          setCartItems(curr => {
            if (existingItem) {
              return curr.map(item =>
                item._id === product._id
                  ? { ...item, quantity: existingItem.quantity }
                  : item
              );
            }
            return curr.filter(item => item._id !== product._id);
          });
          toast.error('Error al agregar al carrito');
          console.error('Error adding to cart:', error);
        }
      }
    } catch (error) {
      toast.error('Error al agregar al carrito');
      console.error('Error in addToCart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      // Store the item before removing it (for potential rollback)
      const itemToRemove = cartItems.find(item => item._id === productId);
      
      // Update local state immediately
      setCartItems(curr => curr.filter(item => item._id !== productId));
      
      // If authenticated, sync with server
      if (isAuthenticated && token && itemToRemove) {
        try {
          await removeFromCartAPI(productId, token);
        } catch (error) {
          // Si el error es 400, puede ser un problema con el carrito, pero ya eliminamos el item localmente
          // así que no revertimos el estado local a menos que sea un error diferente
          if (error?.response?.status !== 400) {
            // Revert local state if API call fails
            setCartItems(curr => [...curr, itemToRemove]);
            toast.error('Error al eliminar del carrito');
          }
          console.error('Error removing from cart:', error);
        }
      }
    } catch (error) {
      toast.error('Error al eliminar del carrito');
      console.error('Error in removeFromCart:', error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      if (quantity < 1) {
        removeFromCart(productId);
        return;
      }
      
      // Store current item state for potential rollback
      const currentItem = cartItems.find(item => item._id === productId);
      if (!currentItem) return;
      
      if (!validateStock(currentItem, quantity)) {
        return;
      }
      
      // Update local state immediately
      setCartItems(curr => curr.map(item =>
        item._id === productId ? { ...item, quantity } : item
      ));
      
      // If authenticated, sync with server
      if (isAuthenticated && token) {
        try {
          // Verificar si el producto ya existe en el carrito del servidor
          let serverCart;
          try {
            serverCart = await getCart(token);
          } catch (error) {
            console.log("No se pudo obtener el carrito del servidor:", error);
            // Si hay error al obtener el carrito, asumimos que no existe y continuamos con la actualización
            serverCart = { cart: { products: [] } };
          }
          
          // Buscar si el producto ya existe en el carrito del servidor
          const existingServerItem = serverCart?.cart?.products?.find(item => 
            item.productId === productId
          );
          
          // Si el producto ya existe en el servidor, primero lo eliminamos para evitar duplicados
          if (existingServerItem) {
            try {
              await removeFromCartAPI(productId, token);
            } catch (removeError) {
              // Si ocurre un error al eliminar, lo registramos pero continuamos
              console.error("Error al eliminar producto existente durante actualización:", removeError);
            }
          }
          
          // Ahora agregamos el producto con la cantidad actualizada
          await addToCartAPI({ 
            productId: productId, 
            quantity: quantity 
          }, token);
        } catch (error) {
          // Revert local state if API call fails
          setCartItems(curr => curr.map(item =>
            item._id === productId ? { ...currentItem } : item
          ));
          toast.error('Error al actualizar cantidad');
          console.error('Error updating quantity:', error);
        }
      }
    } catch (error) {
      toast.error('Error al actualizar cantidad');
      console.error('Error in updateQuantity:', error);
    }
  };

  const clearCart = async () => {
    try {
      // Store current cart for potential rollback
      const currentCart = [...cartItems];
      
      // Clear local state immediately
      setCartItems([]);
      
      // Clear localStorage
      localStorage.removeItem('cart');
      localStorage.removeItem('shippingInfo');
      localStorage.removeItem('paymentInfo');
      
      // If authenticated, sync with server
      if (isAuthenticated && token) {
        try {
          await clearCartAPI(token);
        } catch (error) {
          // Revert local state if API call fails
          setCartItems(currentCart);
          toast.error('Error al vaciar el carrito');
          console.error('Error clearing cart:', error);
        }
      }
    } catch (error) {
      toast.error('Error al vaciar el carrito');
      console.error('Error in clearCart:', error);
    }
  };

  const saveShippingInfo = (info) => {
    setShippingInfo(info);
  };

  const savePaymentInfo = (info) => {
    setPaymentInfo(info);
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  const getCartTotal = () => {
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = shippingInfo?.method === 'express' ? 99 : 0;
    return subtotal + shipping;
  };

  const validateCartStock = () => {
    let isValid = true;
    cartItems.forEach(item => {
      if (item.quantity > item.stock) {
        toast.error(`No hay suficiente stock de ${item.name}. Stock disponible: ${item.stock}`);
        isValid = false;
      }
    });
    return isValid;
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount,
      isCartOpen,
      setIsCartOpen,
      shippingInfo,
      saveShippingInfo,
      paymentInfo,
      savePaymentInfo,
      getCartTotal,
      validateCartStock,
      isLoading
    }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};