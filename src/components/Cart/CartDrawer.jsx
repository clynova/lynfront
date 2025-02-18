import { HiX } from 'react-icons/hi';
import { useCart } from '../../context/CartContext';
import { CartItem } from './CartItem';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
  const { cartItems, cartTotal, isCartOpen, setIsCartOpen } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-slate-900 z-50 shadow-xl transform transition-transform duration-300">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-slate-800">
            <h2 className="text-lg font-medium text-slate-200">Carrito de compras</h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-200"
            >
              <HiX className="h-6 w-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <p className="text-slate-400 text-center">Tu carrito está vacío</p>
            ) : (
              cartItems.map(item => <CartItem key={item.id} item={item} />)
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-slate-800 p-4">
              <div className="flex justify-between mb-4">
                <span className="text-slate-200">Total:</span>
                <span className="text-slate-200 font-medium">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
              <Link
                to="/checkout"
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 
                         hover:from-blue-600 hover:to-indigo-600 text-white py-2 px-4 
                         rounded-lg text-center font-medium transition-all duration-200"
                onClick={() => setIsCartOpen(false)}
              >
                Ir a pagar
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export { CartDrawer };
