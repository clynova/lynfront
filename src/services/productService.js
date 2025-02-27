import api from "./api";

const getProductById = async (_Id) => {
    try {
        const response = await api.get(`/api/product/${_Id}`);
        console.log(response.data)
        return response.data;
    }
    catch (error) {
        throw error.response?.data;
    }
}

export { getProductById }