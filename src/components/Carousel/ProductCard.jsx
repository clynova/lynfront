import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState } from 'react';

const ProductCard = ({ product }) => {
    const [imageError, setImageError] = useState(false);
    const fallbackImage = '/placeholder-image.jpg'; // Añade una imagen por defecto

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <div className="px-2">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl hover:shadow-2xl transition-all p-6">
                <div className="aspect-square relative w-full overflow-hidden rounded-lg mb-4">
                    <img
                        src={imageError || !product.images?.[0] ? fallbackImage : product.images[0]}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                        loading='lazy'
                        onError={handleImageError}
                    />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2 truncate">
                    {product.name}
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                    ${product.price ? product.price.toFixed(2) : 'Precio no disponible'}
                </p>
                <Link
                    to={`/product/${product._id}`}
                    className="block mt-4 text-center text-indigo-500 bg-indigo-100 dark:bg-indigo-900 dark:text-indigo-100 px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-indigo-200 dark:hover:bg-indigo-700"
                >
                    Ver detalles
                </Link>
            </div>
        </div>
    );
};
ProductCard.propTypes = {
    product: PropTypes.shape({
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        _id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
    }).isRequired,
};

export default ProductCard;