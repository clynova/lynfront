import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const SistemaDePago = () => {
    const { cartItems, clearCart, shippingInfo, validateCartStock } = useCart();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [cardInfo, setCardInfo] = useState({
        number: '',
        name: '',
        expiry: '',
        cvv: ''
    });

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    // Calcular el peso total del carrito
    const calculateTotalWeight = () => {
        return cartItems.reduce((total, item) => total + (item.weight || 0) * item.quantity, 0);
    };

    // Calcular el costo de envío basado en el método seleccionado y el peso
    const calculateShippingCost = () => {
        if (shippingInfo?.baseCost && shippingInfo?.extraCostPerKg !== undefined) {
            const totalWeight = calculateTotalWeight();
            // Si el peso total es mayor que 1kg, calcular el costo adicional
            const extraWeight = Math.max(0, totalWeight - 1);
            const baseCost = parseFloat(shippingInfo.baseCost);
            const extraCostPerKg = parseFloat(shippingInfo.extraCostPerKg);
            
            return baseCost + (extraWeight * extraCostPerKg);
        }
        return 0;
    };

    const shippingCost = calculateShippingCost();
    const subtotal = calculateSubtotal();
    const total = subtotal + shippingCost;

    const handleCardInfoChange = (e) => {
        const { name, value } = e.target;
        setCardInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateCartStock()) {
            return;
        }

        navigate('/checkout/confirmation');
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-6">Finalizar Compra</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Order Summary and Shipping Info */}
                <div className="space-y-6">
                    {/* Shipping Address Display */}
                    <div className="border rounded-lg p-4">
                        <h2 className="text-lg font-semibold mb-3">Dirección de Envío</h2>
                        {shippingInfo?.address && (
                            <div className="space-y-1">
                                <p className="font-medium">{shippingInfo.address.street}</p>
                                <p className="text-gray-600">{shippingInfo.address.city}, {shippingInfo.address.state}</p>
                                <p className="text-gray-600">{shippingInfo.address.country}, {shippingInfo.address.zipCode}</p>
                                {shippingInfo.address.reference && (
                                    <p className="text-gray-500 text-sm">Ref: {shippingInfo.address.reference}</p>
                                )}
                                <div className="mt-2 pt-2 border-t">
                                    <p className="text-sm text-gray-600">
                                        Método de envío: {shippingInfo.methodName} ({shippingInfo.deliveryTime})
                                    </p>
                                    {shippingInfo.carrierName && (
                                        <p className="text-sm text-gray-600">
                                            Transportista: {shippingInfo.carrierName}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Order Summary */}
                    <div>
                        <h2 className="text-lg font-semibold mb-3">Resumen del Pedido</h2>
                        <div className="border rounded-lg p-4 space-y-4">
                            {cartItems.map((item) => (
                                <div key={item._id} className="flex justify-between">
                                    <div>
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                                        {item.weight && (
                                            <p className="text-sm text-gray-500">Peso: {(item.weight * item.quantity).toFixed(2)}kg</p>
                                        )}
                                    </div>
                                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                            <div className="border-t pt-4 space-y-2">
                                <div className="flex justify-between">
                                    <p>Subtotal</p>
                                    <p>${subtotal.toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Envío {shippingInfo?.methodName && `(${shippingInfo.methodName})`}</p>
                                    <p>${shippingCost.toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <p>Peso total:</p>
                                    <p>{calculateTotalWeight().toFixed(2)}kg</p>
                                </div>
                                <div className="flex justify-between font-bold">
                                    <p>Total</p>
                                    <p>${total.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Form */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">Método de Pago</h2>
                    <div className="space-y-4">
                        <div className="flex space-x-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="card"
                                    checked={paymentMethod === 'card'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="mr-2"
                                />
                                Tarjeta de Crédito/Débito
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="paypal"
                                    checked={paymentMethod === 'paypal'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="mr-2"
                                />
                                PayPal
                            </label>
                        </div>

                        {paymentMethod === 'card' && (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Número de Tarjeta
                                    </label>
                                    <input
                                        type="text"
                                        name="number"
                                        value={cardInfo.number}
                                        onChange={handleCardInfoChange}
                                        placeholder="1234 5678 9012 3456"
                                        className="mt-1 block w-full border rounded-md shadow-sm p-2"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Nombre en la Tarjeta
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={cardInfo.name}
                                        onChange={handleCardInfoChange}
                                        className="mt-1 block w-full border rounded-md shadow-sm p-2"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Fecha de Expiración
                                        </label>
                                        <input
                                            type="text"
                                            name="expiry"
                                            value={cardInfo.expiry}
                                            onChange={handleCardInfoChange}
                                            placeholder="MM/AA"
                                            className="mt-1 block w-full border rounded-md shadow-sm p-2"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            CVV
                                        </label>
                                        <input
                                            type="text"
                                            name="cvv"
                                            value={cardInfo.cvv}
                                            onChange={handleCardInfoChange}
                                            placeholder="123"
                                            className="mt-1 block w-full border rounded-md shadow-sm p-2"
                                            required
                                        />
                                    </div>
                                </div>
                            </form>
                        )}

                        {paymentMethod === 'paypal' && (
                            <div className="text-center p-8 border rounded">
                                <p className="mb-4">Serás redirigido a PayPal para completar tu pago</p>
                                <button 
                                    onClick={handleSubmit}
                                    className="bg-[#0070ba] text-white px-6 py-2 rounded hover:bg-[#003087]"
                                >
                                    Pagar con PayPal
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between items-center mt-8">
                        <Link
                            to="/checkout/envio"
                            className="text-blue-600 hover:text-blue-800"
                        >
                            ← Volver al envío
                        </Link>
                        {paymentMethod === 'card' && (
                            <button
                                onClick={handleSubmit}
                                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                            >
                                Confirmar Pedido
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export { SistemaDePago };