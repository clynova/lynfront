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
const syncCart = async (cartItems, token) => {
  if (!token || !cartItems || cartItems.length === 0) return null;
  
  try {
    let serverCart;
    
    try {
      // First get the server cart to compare
      serverCart = await getCart(token);
    } catch (error) {
      // If we can't get the server cart but it's because it's empty,
      // initialize an empty structure and continue
      if (error.msg?.toLowerCase().includes('vacío')) {
        serverCart = { success: true, cart: { products: [] } };
      } else {
        throw error;
      }
    }
    
    // Now safely access the server cart products
    const serverProducts = serverCart?.cart?.products || [];
    
    // Process each local cart item
    for (const item of cartItems) {
      // Check if the item already exists in the server cart
      const existingItem = serverProducts.find(
        p => p.productId === item._id
      );
      
      if (!existingItem) {
        // Add new item
        await addToCart({
          productId: item._id,
          quantity: item.quantity
        }, token);
      } else if (existingItem.quantity !== item.quantity) {
        // Update quantity if different
        // First remove, then add with new quantity
        await removeFromCart(item._id, token);
        await addToCart({
          productId: item._id,
          quantity: item.quantity
        }, token);
      }
    }
    
    // Return the updated cart
    return await getCart(token);
  } catch (error) {
    console.error("Error syncing cart:", error);
    // Don't throw the error, just log it and return null
    // This prevents the login flow from being disrupted
    return null;
  }
};

export {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
  syncCart
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