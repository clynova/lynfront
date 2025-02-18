import img1 from '../images/ejemplos/D_NQ_NP637426-MLA74072166204_012024-B.webp';
import img2 from '../images/ejemplos/D_NQ_NP792256-MLA74071914036_012024-B.webp';
import img3 from '../images/ejemplos/D_NQ_NP954611-MLA74179693633_012024-B.webp';
import { FaCartPlus } from "react-icons/fa";

const products = [
  { id: 1, name: 'Producto Premium 1', price: '$999', image: img1, description: 'Alta calidad garantizada' },
  { id: 2, name: 'Producto Premium 2', price: '$899', image: img2, description: 'Diseño exclusivo' },
  { id: 3, name: 'Producto Premium 3', price: '$799', image: img3, description: 'Lo último en tecnología' },
  // Duplicar para llenar el grid 3x3
  { id: 4, name: 'Producto Premium 4', price: '$999', image: img1, description: 'Alta calidad garantizada' },
  { id: 5, name: 'Producto Premium 5', price: '$899', image: img2, description: 'Diseño exclusivo' },
  { id: 6, name: 'Producto Premium 6', price: '$799', image: img3, description: 'Lo último en tecnología' },
  { id: 7, name: 'Producto Premium 7', price: '$999', image: img1, description: 'Alta calidad garantizada' },
  { id: 8, name: 'Producto Premium 8', price: '$899', image: img2, description: 'Diseño exclusivo' },
  { id: 9, name: 'Producto Premium 9', price: '$799', image: img3, description: 'Lo último en tecnología' },
];

const ProductGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map(product => (
        <div key={product.id} 
             className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <div className="relative overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-4 right-4">
              <button className="bg-white/80 p-2 rounded-full hover:bg-white transition-colors">
                <FaCartPlus  />
              </button>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2 dark:text-white">{product.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{product.price}</span>
              <button className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg 
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