import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Confirmation = () => {
    const { cartItems, clearCart } = useCart();

    // Clear cart after showing confirmation
    setTimeout(() => {
        clearCart();
    }, 1000);

    return (
        <div className="bg-white p-8 rounded-lg shadow text-center">
            <div className="mb-8">
                <svg className="mx-auto h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">¡Gracias por tu compra!</h1>
            <p className="text-lg text-gray-600 mb-8">
                Tu pedido ha sido confirmado y está siendo procesado.
            </p>

            <div className="max-w-md mx-auto mb-8">
                <div className="border-t border-b py-4">
                    <h2 className="text-lg font-semibold mb-4">Detalles del Pedido</h2>
                    <div className="space-y-2">
                        {cartItems.map((item) => (
                            <div key={item._id} className="flex justify-between">
                                <span>{item.name} x {item.quantity}</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <p className="text-gray-600 mb-8">
                Recibirás un correo electrónico con los detalles de tu pedido y la información de seguimiento.
            </p>

            <div className="space-x-4">
                <Link
                    to="/"
                    className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                    Volver a la Tienda
                </Link>
                <Link
                    to="/myprofile/orders"
                    className="inline-block text-blue-600 hover:text-blue-800"
                >
                    Ver Mis Pedidos
                </Link>
            </div>
        </div>
    );
};

export { Confirmation };