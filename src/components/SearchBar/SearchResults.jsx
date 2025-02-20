import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const SearchResults = ({ results, onClose }) => {
    if (results.length === 0) return null;

    return (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 rounded-lg shadow-xl max-h-96 overflow-y-auto">
            {results.map((product) => (
                <Link
                    key={product._id}
                    to={`/product/${product._id}`}
                    className="flex items-center p-4 hover:bg-slate-700 transition-colors"
                    onClick={onClose}
                >
                    <img                        
                        src={product.images?.[0] || '/images/placeholder.png'} // Usa una imagen por defecto si no hay imágenes
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                    />
                    <div className="ml-4">
                        <p className="text-white font-medium">{product.name}</p>
                        <p className="text-slate-400">${product.price}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};
SearchResults.propTypes = {
    results: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]).isRequired,
            images: PropTypes.arrayOf(PropTypes.string).isRequired, // Cambiado de image a images
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
        })
    ).isRequired,
    onClose: PropTypes.func.isRequired,
};

export { SearchResults };
