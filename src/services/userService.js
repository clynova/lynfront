import api from "./api";

const updateProfile = async (formData, token) => {
    try {
        const response = await api.put("/api/user/perfil", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
    catch (error) {
        throw error.response?.data;
    }
}

const getOrders = async (token) => {
    try {
        const response = await api.get("/api/order", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
    catch (error) {
        throw error.response?.data;
    }
}

const getWishlist = async (token) => {
    try {
        const response = await api.get("/api/wishlist", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
    catch (error) {
        throw error.response?.data;
    }
}

const addProductToWishlist = async (productId, token) => {
    try {
        const response = await api.post("/api/wishlist/add", { productId }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
    catch (error) {
        throw error.response?.data;
    }
}

const removeFromWishlist = async (productId, token) => {
    try {
        const response = await api.delete(`/api/wishlist/remove/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
    catch (error) {
        throw error.response?.data;
    }
}

const getAddresses = async (token) => {
    try {
        const response = await api.get("/api/user/addresses", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
    catch (error) {
        throw error.response?.data;
    }
}

const addAddress = async (addressData, token) => {
    try {
        const response = await api.post("/api/user/addresses", addressData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
    catch (error) {
        throw error.response?.data;
    }
}

const updateAddress = async (addressId, addressData, token) => {
    try {
        const response = await api.put(`/api/user/addresses/${addressId}`, addressData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
    catch (error) {
        throw error.response?.data;
    }
}

const deleteAddress = async (addressId, token) => {
    try {
        const response = await api.delete(`/api/user/addresses/${addressId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
    catch (error) {
        throw error.response?.data;
    }
}

const getMyPaymentMethods = async (token) => {
    try {
        const response = await api.get("/api/payment-methods", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
    catch (error) {
        throw error.response?.data;
    }
}

const setDefaultPaymentMethod = async (paymentMethodId, token) => {
    try {
        const response = await api.put(`/api/payment-methods/${paymentMethodId}/default`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
    catch (error) {
        throw error.response?.data;
    }
}

const togglePaymentMethodStatus = async (paymentMethodId, token) => {
    try {
        const response = await api.put(`/api/payment-methods/${paymentMethodId}/toggle-status`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
    catch (error) {
        throw error.response?.data;
    }
}

const deletePaymentMethod = async (paymentMethodId, token) => {
    try {
        const response = await api.delete(`/api/payment-methods/${paymentMethodId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
    catch (error) {
        throw error.response?.data;
    }
}

const addPaymentMethod = async (paymentMethodData, token) => {
    try {
        const response = await api.post("/api/payment-methods", paymentMethodData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
    catch (error) {
        throw error.response?.data;
    }
}

export {
    updateProfile,
    getOrders,
    getWishlist,
    addProductToWishlist,
    removeFromWishlist,
    getAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
    getMyPaymentMethods,
    setDefaultPaymentMethod,
    togglePaymentMethodStatus,
    deletePaymentMethod,
    addPaymentMethod
}