import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const SearchResults = ({ results, onClose }) => {
    if (results.length === 0) return null;

    return (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 rounded-lg shadow-xl max-h-96 overflow-y-auto">
            {results.map((product) => (
                <Link
                    key={product.id}
                    to={`/producto/${product.id}`}
                    className="flex items-center p-4 hover:bg-slate-700 transition-colors"
                    onClick={onClose}
                >
                    <img
                        src={product.image}
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
            id: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
        })
    ).isRequired,
    onClose: PropTypes.func.isRequired,
};

export { SearchResults };
