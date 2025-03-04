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
    // Usando la ruta correcta según los comentarios de la API
    const response = await api.delete("/api/cart", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  } catch (error) {
    // Si recibimos un 404, probablemente es porque el carrito no existe aún
    // En este caso, no es realmente un error, ya que el objetivo era limpiar el carrito
    if (error.response?.status === 404 || 
        (error.response?.data?.msg && (
          error.response?.data?.msg.toLowerCase().includes('no existe') ||
          error.response?.data?.msg.toLowerCase().includes('no encontrado') ||
          error.response?.data?.msg.toLowerCase().includes('no hay') ||
          error.response?.data?.msg.toLowerCase().includes('vacío')
        ))
    ) {
      return { 
        success: true, 
        msg: "No hay carrito para limpiar o ya está vacío" 
      };
    }
    // Devolvemos un objeto de éxito para no interrumpir el flujo de la aplicación
    // pero con una flag indicando que falló la operación
    return {
      success: false,
      error: error.response?.data || error,
      msg: "Error al limpiar el carrito"
    };
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
      // Si no se puede obtener el carrito del servidor porque está vacío o no existe,
      // inicializamos una estructura vacía y continuamos
      serverCart = { success: true, cart: { products: [] } };
      console.log("Inicializando carrito vacío para sincronización");
    }
    
    // Verificar si debemos preferir el carrito del servidor o el local
    if (preferServerCart) {
      // Si preferimos el carrito del servidor y este ya tiene productos, lo devolvemos directamente
      if (serverCart?.cart?.products && serverCart.cart.products.length > 0) {
        return serverCart;
      }
    }
    
    // Si llegamos aquí, sincronizamos el carrito local con el servidor
    
    // Para usuarios que ingresan por primera vez, podemos omitir la limpieza del carrito
    // ya que sabemos que no tienen uno. Esto evitará la llamada 404.
    if (serverCart?.cart?.products && serverCart.cart.products.length > 0) {
      try {
        // Solo intentamos limpiar si hay un carrito existente
        const clearResult = await clearCart(token);
        if (!clearResult.success) {
          console.warn("Advertencia al limpiar el carrito:", clearResult.msg);
        }
      } catch (error) {
        console.warn("Error al intentar limpiar el carrito:", error);
        // Continuamos con el proceso
      }
    }
    
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
    try {
      return await getCart(token);
    } catch (error) {
      console.error("Error obteniendo carrito actualizado:", error);
      // Si hay error al obtener el carrito actualizado, devolvemos al menos los items locales
      return { 
        success: true, 
        cart: { 
          products: cartItems.map(item => ({ 
            productId: item._id, 
            quantity: item.quantity 
          }))
        }
      };
    }
  } catch (error) {
    console.error("Error syncing cart:", error);
    // No lanzamos el error, solo lo registramos y devolvemos un valor por defecto
    return { 
      success: false, 
      error: error,
      cart: { products: [] } 
    };
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