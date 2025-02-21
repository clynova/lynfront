import api from './api';

const register = async (formData) => {
  try {
    const response = await api.post('/api/user/registrar', formData);
    return response.data;
  } catch (error) {
    const errorData = {
      status: error.response?.status,
      data: error.response?.data || {},
      msg: error.response?.data?.message || 'Error en el servidor'
    };
    throw errorData;
  }
};

const login = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    return response.data;
  } catch (error) {    
    throw error.response.data;
  }
};

export { register, login };