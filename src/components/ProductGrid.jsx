import { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { FaCartPlus } from "react-icons/fa";
import { cortarTexto } from '../utils/funcionesReutilizables';
import { useProducts } from '../context/ProductContext';


const ProductGrid = () => {
  const { addToCart } = useCart();
  const { products, loading, error, fetchProducts } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map(product => (
        <div key={product._id}
          className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <div className="relative overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-4 right-4">
              <button
                onClick={() => addToCart(product)}
                className="bg-white/80 p-2 rounded-full hover:bg-white transition-colors">
                <FaCartPlus />
              </button>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2 dark:text-white">{product.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{cortarTexto(product.description, 20)}</p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">${product.price}</span>
              <button
                onClick={() => addToCart(product)}
                className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg 
                         hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;