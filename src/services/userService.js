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


export { updateProfile }