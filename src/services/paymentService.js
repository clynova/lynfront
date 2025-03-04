import api from "./api";

/**
 * Cart API Functions
 */

// Get user's cart from the server
const getCart = async (token) => {
  try {
    const response = await api.get("/api/cart", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  } catch (error) {
    // If the error is a 400 with "cart is empty" message, return an empty cart structure
    if (error.response?.status === 400 && 
        error.response?.data?.msg?.toLowerCase().includes('vacío')) {
      return { 
        success: true, 
        cart: { 
          products: [] 
        }
      };
    }
    throw error.response?.data || error;
  }
};

// Add a product to the cart
const addToCart = async (productData, token) => {
  try {
    const response = await api.post("/api/cart", productData, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Remove a product from the cart
const removeFromCart = async (productId, token) => {
  try {
    const response = await api.delete(`/api/cart/${productId}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Clear the entire cart
const clearCart = async (token) => {
  try {
    const response = await api.delete("/api/cart", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Sync local cart with server cart (used when user logs in)
const syncCart = async (cartItems, token, preferServerCart = false) => {
  if (!token) return null;
  
  try {
    // Si preferimos el carrito del servidor y no hay items locales, simplemente devolvemos el carrito del servidor
    if (preferServerCart && (!cartItems || cartItems.length === 0)) {
      return await getCart(token);
    }
    
    // Si preferimos el carrito local o tenemos items locales a sincronizar
    let serverCart;
    
    try {
      // Obtener el carrito del servidor
      serverCart = await getCart(token);
    } catch (error) {
      // Si no se puede obtener el carrito del servidor porque está vacío,
      // inicializamos una estructura vacía y continuamos
      if (error.msg?.toLowerCase().includes('vacío')) {
        serverCart = { success: true, cart: { products: [] } };
      } else {
        throw error;
      }
    }
    
    // Verificar si debemos preferir el carrito del servidor o el local
    if (preferServerCart) {
      // Si preferimos el carrito del servidor y este ya tiene productos, lo devolvemos directamente
      if (serverCart?.cart?.products && serverCart.cart.products.length > 0) {
        return serverCart;
      }
    }
    
    // Si llegamos aquí, sincronizamos el carrito local con el servidor
    
    // Primero, limpiamos el carrito del servidor
    await clearCart(token);
    
    // Luego añadimos cada item del carrito local al servidor
    if (cartItems && cartItems.length > 0) {
      for (const item of cartItems) {
        if (item._id) {
          try {
            await addToCart({
              productId: item._id,
              quantity: item.quantity || 1
            }, token);
          } catch (error) {
            console.error(`Error al añadir producto ${item._id} al carrito:`, error);
          }
        }
      }
    }
    
    // Devolvemos el carrito actualizado
    return await getCart(token);
  } catch (error) {
    console.error("Error syncing cart:", error);
    // No lanzamos el error, solo lo registramos y devolvemos null
    // Esto previene que el flujo de inicio de sesión se interrumpa
    return null;
  }
};

// Función para reemplazar completamente el carrito local con el del servidor
const replaceLocalCartWithServer = async (token) => {
  try {
    return await getCart(token);
  } catch (error) {
    console.error("Error fetching server cart:", error);
    return { success: false, cart: { products: [] } };
  }
};

export {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
  syncCart,
  replaceLocalCartWithServer
};

/*

GET /cart


Success Response (200):

{
  "success": true,
  "cart": {
    "userId": "string",
    "products": [
      {
        "productId": "string",
        "quantity": "number"
      }
    ],
    "updatedAt": "date"
  },
  "msg": "Se envio correctamente el carrito"
}

POST /cart

{
  "productId": "string",
  "quantity": "number"
}

Success Response (200):

{
  "success": true,
  "cart": {
    "userId": "string",
    "products": [
      {
        "productId": "string",
        "quantity": "number"
      }
    ],
    "updatedAt": "date"
  }
}

DELETE /cart


{
  "success": true,
  "msg": "Carrito vaciado exitosamente"
}

DELETE /cart/:productId

Success Response (200):

{
  "success": true,
  "msg": "Carrito vaciado exitosamente"
}


*/