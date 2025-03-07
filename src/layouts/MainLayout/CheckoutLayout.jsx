import { useCart } from '../../context/CartContext';
import { Outlet, useLocation } from 'react-router-dom';

const CheckoutLayout = () => {
    const { cartItems, shippingInfo } = useCart();
    const location = useLocation();

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    // Calcular el peso total del carrito
    const calculateTotalWeight = () => {
        return cartItems.reduce((total, item) => total + (item.weight || 0) * item.quantity, 0);
    };

    // Determinar el costo de envío basado en el método seleccionado
    const getShippingCost = () => {
        if (shippingInfo && shippingInfo.methodId) {
            const totalWeight = calculateTotalWeight();
            // Si el peso total es mayor que 1kg, calcular el costo adicional
            const extraWeight = Math.max(0, totalWeight - 1); // Peso adicional después del primer kg
            const baseCost = shippingInfo.baseCost || 0;
            const extraCostPerKg = shippingInfo.extraCostPerKg || 0;
            
            return baseCost + (extraWeight * extraCostPerKg);
        }
        return 0;
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
                                        {item.weight && (
                                            <p className="text-gray-500 text-xs">Peso: {(item.weight * item.quantity).toFixed(2)}kg</p>
                                        )}
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
                                    <p>Envío {shippingInfo?.methodName && `(${shippingInfo.methodName})`}</p>
                                    <p>${shippingCost.toFixed(2)}</p>
                                </div>
                                {shippingInfo?.deliveryTime && (
                                    <div className="text-sm text-gray-600">
                                        <p>Tiempo estimado: {shippingInfo.deliveryTime}</p>
                                    </div>
                                )}
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