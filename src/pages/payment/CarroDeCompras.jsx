import { useCart } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const CarroDeCompras = () => {
    const { cartItems, removeFromCart, updateQuantity, validateCartStock } = useCart();
    const navigate = useNavigate();

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleContinue = () => {
        if (!validateCartStock()) {
            return;
        }
        navigate('/checkout/envio');
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-6">Tu Carrito de Compras</h1>
            
            {cartItems.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">Tu carrito está vacío</p>
                    <Link to="/" className="text-blue-600 hover:text-blue-800">
                        Continuar comprando
                    </Link>
                </div>
            ) : (
                <>
                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <div key={item._id} className="flex items-center justify-between border-b pb-4">
                                <div className="flex items-center space-x-4">
                                    <img 
                                        src={item.images?.[0]} 
                                        alt={item.name} 
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                    <div>
                                        <h3 className="font-medium">{item.name}</h3>
                                        <p className="text-gray-600">${item.price}</p>
                                        <p className="text-sm text-gray-500">
                                            Stock disponible: {item.stock}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <select
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                                        className="border rounded p-1"
                                    >
                                        {[...Array(Math.min(10, item.stock))].map((_, i) => (
                                            <option key={i + 1} value={i + 1}>
                                                {i + 1}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 flex justify-between items-center">
                        <div>
                            <p className="text-xl font-bold">Total: ${calculateTotal().toFixed(2)}</p>
                        </div>
                        <button
                            onClick={handleContinue}
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                        >
                            Continuar con el envío
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export { CarroDeCompras };