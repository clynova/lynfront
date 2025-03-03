import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  const [shippingInfo, setShippingInfo] = useState(() => {
    const savedInfo = localStorage.getItem('shippingInfo');
    return savedInfo ? JSON.parse(savedInfo) : null;
  });

  const [paymentInfo, setPaymentInfo] = useState(() => {
    const savedInfo = localStorage.getItem('paymentInfo');
    return savedInfo ? JSON.parse(savedInfo) : null;
  });

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

  const addToCart = (product) => {
    setCartItems(curr => {
      const existingItem = curr.find(item => item._id === product._id);
      if (existingItem) {
        const newQuantity = existingItem.quantity + 1;
        if (!validateStock(product, newQuantity)) {
          return curr;
        }
        return curr.map(item =>
          item._id === product._id
            ? { ...item, quantity: newQuantity }
            : item
        );
      }
      if (!validateStock(product, 1)) {
        return curr;
      }
      return [...curr, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(curr => curr.filter(item => item._id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems(curr => {
      const item = curr.find(item => item._id === productId);
      if (!validateStock(item, quantity)) {
        return curr;
      }
      return curr.map(item =>
        item._id === productId ? { ...item, quantity } : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
    localStorage.removeItem('shippingInfo');
    localStorage.removeItem('paymentInfo');
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
      validateCartStock
    }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};