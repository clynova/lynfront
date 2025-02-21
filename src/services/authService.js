import api from './api';

const register = async (formData) => {
  try {
    const response = await api.post('/api/user/registrar', formData);
    return response.data;
  } catch (error) {
    throw error.response.data;
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