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


export { updateProfile, getOrders, getWishlist, addProductToWishlist }