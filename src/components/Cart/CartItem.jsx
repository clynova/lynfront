import { HiMinus, HiPlus, HiX } from 'react-icons/hi';
import { useCart } from '../../context/CartContext';
import PropTypes from 'prop-types';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center py-4 border-b border-slate-700">
      <img
        src={item.images[0]}
        alt={item.name}
        className="w-16 h-16 object-cover rounded"
      />
      <div className="flex-1 ml-4">
        <h3 className="text-sm font-medium text-slate-200">{item.name}</h3>
        <p className="text-sm text-slate-400">${item.price}</p>
        <div className="flex items-center mt-2">
          <button
            onClick={() => updateQuantity(item._id, item.quantity - 1)}
            className="p-1 text-slate-400 hover:text-slate-200"
          >
            <HiMinus className="h-4 w-4" />
          </button>
          <span className="mx-2 text-slate-300">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item._id, item.quantity + 1)}
            className="p-1 text-slate-400 hover:text-slate-200"
          >
            <HiPlus className="h-4 w-4" />
          </button>
        </div>
      </div>
      <button
        onClick={() => removeFromCart(item._id)}
        className="p-2 text-slate-400 hover:text-red-400"
      >
        <HiX className="h-5 w-5" />
      </button>
    </div>
  );
};
CartItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};


export { CartItem };
