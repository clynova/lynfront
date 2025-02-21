import { createContext, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const ProductContext = createContext();

const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProducts = useCallback(async (page = 1, filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/product`, {
        params: {
          page,
          ...filters
        }
      });
      
      setProducts(data.products);
      setTotalPages(data.totalPages);
      setCurrentPage(page);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  }, []);

  const getProductById = useCallback(async (_id) => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/product/${_id}`);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Producto no encontrado');
      return null;
    }
  }, []);

  return (
    <ProductContext.Provider value={{
      products,
      loading,
      error,
      currentPage,
      totalPages,
      fetchProducts,
      getProductById,
      setCurrentPage
    }}>
      {children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { useProducts, ProductProvider };
