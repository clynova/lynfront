import { useCart } from '../../context/CartContext';
import { Outlet, useLocation } from 'react-router-dom';

const CheckoutLayout = () => {
    const { cartItems, shippingInfo } = useCart();
    const location = useLocation();

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    // Determinar el costo de envío basado en la información guardada o la ubicación actual
    const getShippingCost = () => {
        if (shippingInfo && shippingInfo.method) {
            return shippingInfo.method === 'express' ? 99.00 : 0;
        }
        // Si aún no hay método seleccionado pero estamos en la página de pago, mostrar el costo del express
        return location.pathname === '/checkout/pago' ? 99.00 : 0;
    };

    const shippingCost = getShippingCost();
    const total = calculateSubtotal() + shippingCost;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 mt-20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <main className="md:col-span-3">
                    <Outlet />
                </main>
                
                {/* Order Summary Sidebar */}
                <aside className="md:col-span-1">
                    <div className="bg-white p-4 rounded-lg shadow sticky top-24">
                        <h2 className="text-lg font-semibold mb-4">Resumen de la Orden</h2>
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div key={item._id} className="flex justify-between text-sm">
                                    <div>
                                        <p>{item.name}</p>
                                        <p className="text-gray-600">Cantidad: {item.quantity}</p>
                                    </div>
                                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                            <div className="border-t pt-4 space-y-2">
                                <div className="flex justify-between">
                                    <p>Subtotal</p>
                                    <p>${calculateSubtotal().toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Envío</p>
                                    <p>${shippingCost.toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between font-bold">
                                    <p>Total</p>
                                    <p>${total.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export { CheckoutLayout };