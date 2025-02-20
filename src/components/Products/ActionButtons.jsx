import PropTypes from 'prop-types';
import { FaShoppingCart, FaHeart, FaShare } from 'react-icons/fa';

const ActionButtons = ({ product, addToCart }) => {
    return (
        <div className="mt-10 flex flex-col space-y-4">
            <button
                onClick={() => addToCart(product)}
                aria-label="Agregar al carrito"
                className="flex-1 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
                <FaShoppingCart className="w-5 h-5" />
                <span>Agregar al carrito</span>
            </button>
            <div className="grid grid-cols-2 gap-4">
                <button
                    aria-label="Compartir producto"
                    className="flex items-center justify-center space-x-2 px-6 py-3 border  rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-colors duration-200 text-white"
                >
                    <FaHeart className="w-5 h-5" />
                    <span>Guardar</span>
                </button>

                <button
                    aria-label="Compartir producto"
                    className="flex items-center justify-center space-x-2 px-6 py-3 border  rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-colors duration-200 text-white"
                >
                    <FaShare className="w-5 h-5" />
                    <span>Compartir</span>
                </button>
            </div>
        </div>
    );
}

ActionButtons.propTypes = {
    product: PropTypes.object.isRequired,
    addToCart: PropTypes.func.isRequired,
};

export { ActionButtons };