import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaHeart, FaShare } from 'react-icons/fa';
import { products } from '../data/products';

const ProductDetails = () => {
  const { _id } = useParams();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);

  // Simulamos obtener el producto por ID
  const product = products.find(p => p._id === parseInt(_id));

  if (!product) {
    return <div className="text-center text-2xl mt-20">Producto no encontrado</div>;
  }



  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" style={{marginTop: '4rem'}}>
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        {/* Galería de imágenes */}
        <div className="flex flex-col">
          <div className="relative">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`relative rounded-lg overflow-hidden ${selectedImage === idx ? 'ring-2 ring-blue-500' : ''
                  }`}
              >
                <img
                  src={img}
                  alt={`Vista ${idx + 1}`}
                  className="w-full h-24 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Información del producto */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            {product.name}
          </h1>

          <div className="mt-3">
            <h2 className="sr-only">Información del producto</h2>
            <p className="text-3xl tracking-tight text-gray-900 dark:text-white">
              ${product.price}
            </p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Descripción</h3>
            <p className="text-base text-gray-700 dark:text-gray-300">
              {product.description}
            </p>
          </div>

          <div className="mt-10 flex flex-col space-y-4">
            <button
              onClick={() => addToCart(product)}
              className="flex-1 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 
                       transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <FaShoppingCart className="w-5 h-5" />
              <span>Agregar al carrito</span>
            </button>

            <div className="grid grid-cols-2 gap-4">
              <button
                className="flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 
                         dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 
                         transition-colors duration-200"
              >
                <FaHeart className="w-5 h-5" />
                <span>Guardar</span>
              </button>
              <button
                className="flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 
                         dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 
                         transition-colors duration-200"
              >
                <FaShare className="w-5 h-5" />
                <span>Compartir</span>
              </button>
            </div>
          </div>

          {/* Características del producto */}
          <div className="mt-10">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Características</h3>
            <div className="mt-4">
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>Garantía de 12 meses</li>
                <li>Envío gratis</li>
                <li>Devolución gratuita por 30 días</li>
                <li>Stock disponible</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProductDetails };
