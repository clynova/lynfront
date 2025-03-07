import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { getPaymentMethods } from '../../services/paymentMethods';
import { createOrder, initiatePayment } from '../../services/checkoutService';
import { getImageUrl } from '../../utils/funcionesReutilizables';

const SistemaDePago = () => {
    const { cartItems, clearCart, shippingInfo, validateCartStock } = useCart();
    const { token } = useAuth();
    const navigate = useNavigate();
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cardInfo, setCardInfo] = useState({
        number: '',
        name: '',
        expiry: '',
        cvv: ''
    });
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const fetchPaymentMethods = async () => {
            try {
                const response = await getPaymentMethods();
                if (response.success && response.data) {
                    setPaymentMethods(response.data);
                    if (response.data.length > 0) {
                        setSelectedMethod(response.data[0]._id);
                    }
                }
            } catch (err) {
                setError('Error al cargar los métodos de pago');
                toast.error('Error al cargar los métodos de pago');
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentMethods();
    }, []);

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const calculateTotalWeight = () => {
        return cartItems.reduce((total, item) => total + (item.weight || 0) * item.quantity, 0);
    };

    const calculateShippingCost = () => {
        if (shippingInfo?.baseCost && shippingInfo?.extraCostPerKg !== undefined) {
            const totalWeight = calculateTotalWeight();
            const extraWeight = Math.max(0, totalWeight - 1);
            const baseCost = parseFloat(shippingInfo.baseCost);
            const extraCostPerKg = parseFloat(shippingInfo.extraCostPerKg);

            return baseCost + (extraWeight * extraCostPerKg);
        }
        return 0;
    };

    // Calcular la comisión del método de pago
    const calculatePaymentCommission = (subtotalWithShipping) => {
        if (selectedMethod) {
            const selectedPaymentMethod = paymentMethods.find(method => method._id === selectedMethod);
            if (selectedPaymentMethod?.commission_percentage) {
                return (subtotalWithShipping * selectedPaymentMethod.commission_percentage) / 100;
            }
        }
        return 0;
    };

    const shippingCost = calculateShippingCost();
    const subtotal = calculateSubtotal();
    const subtotalWithShipping = subtotal + shippingCost;
    const paymentCommission = calculatePaymentCommission(subtotalWithShipping);
    const total = subtotalWithShipping + paymentCommission;

    const handleCardInfoChange = (e) => {
        const { name, value } = e.target;
        setCardInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateCartStock()) {
            return;
        }

        if (!selectedMethod) {
            toast.error('Por favor selecciona un método de pago');
            return;
        }

        setIsProcessing(true);

        try {
            // Crear la orden
            // Crear la orden
            /*      const orderData = {
                      shippingAddressId: shippingInfo.address._id,
                      paymentMethod: selectedMethod,
                      shippingMethod: shippingInfo.methodId,
                      recipientName: shippingInfo.address.recipientName,
                      phoneContact: shippingInfo.address.phoneContact,
                      additionalInstructions: shippingInfo.address.reference
                  };
      
                  */

            const orderData = {
                shippingAddressId: shippingInfo.address._id,
                paymentMethod: selectedMethod,
                shippingMethod: shippingInfo.carrierId,
                recipientName: "María González",
                phoneContact: "+56912345678",
                additionalInstructions: "El portón es azul, por favor tocar el timbre"
            };

            const orderResponse = await createOrder(orderData, token);

            if (!orderResponse.success) {
                throw new Error(orderResponse.message || 'Error al crear la orden');
            }

            // Iniciar el proceso de pago
            const paymentResponse = await initiatePayment(orderResponse.order._id, token);

            // Construir URL de pago y abrir en nueva ventana
            const paymentUrl = new URL(paymentResponse.redirectUrl);
            paymentUrl.searchParams.set(
                paymentResponse.payment_type === 'webpay' ? 'token_ws' : 'token',
                paymentResponse.token
            );

            // Abrir ventana de pago
            const width = 800;
            const height = 600;
            const left = (window.screen.width - width) / 2;
            const top = (window.screen.height - height) / 2;

            window.open(
                paymentUrl.toString(),
                'Pago',
                `width=${width},height=${height},left=${left},top=${top},location=no,menubar=no,toolbar=no,status=no,scrollbars=yes,resizable=yes`
            );

            // Limpiar carrito y redirigir
            /*   clearCart();
               navigate('/checkout/confirmation', { 
                   state: { 
                       orderId: orderResponse.order._id,
                       paymentType: paymentResponse.payment_type 
                   }
               });
   
   */


        } catch (error) {
            toast.error(error.message || 'Error al procesar el pago');
            setIsProcessing(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-48">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <p className="text-red-600">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 text-blue-600 hover:text-blue-800"
                >
                    Reintentar
                </button>
            </div>
        );
    }

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
                                {selectedMethod && paymentCommission > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <p>Comisión de pago:</p>
                                        <p>${paymentCommission.toFixed(2)}</p>
                                    </div>
                                )}
                                <div className="flex justify-between font-bold">
                                    <p>Total</p>
                                    <p>${total.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Methods */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">Método de Pago</h2>
                    <div className="space-y-4">
                        {paymentMethods.map((method) => (
                            <label
                                key={method._id}
                                className={`flex items-center p-4 border rounded cursor-pointer hover:bg-gray-50 ${selectedMethod === method._id ? 'border-blue-500 bg-blue-50' : ''
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value={method._id}
                                    checked={selectedMethod === method._id}
                                    onChange={(e) => setSelectedMethod(e.target.value)}
                                    className="mr-3"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center gap-3">
                                        {method.logo_url && (
                                            <img
                                                src={getImageUrl(method.logo_url)}
                                                alt={method.name}
                                                className="h-8 w-auto object-contain"
                                            />
                                        )}
                                        <div>
                                            <p className="font-medium">{method.name}</p>
                                            <p className="text-sm text-gray-600">{method.description}</p>
                                            {method.commission_percentage > 0 && (
                                                <p className="text-xs text-gray-500">
                                                    Comisión: {method.commission_percentage}%
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </label>
                        ))}

                        {selectedMethod && (
                            <div className="mt-6">
                                <div className="flex justify-between items-center">
                                    <Link
                                        to="/checkout/envio"
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        ← Volver al envío
                                    </Link>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={isProcessing}
                                        className={`${isProcessing
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-blue-600 hover:bg-blue-700'
                                            } text-white px-6 py-2 rounded flex items-center gap-2`}
                                    >
                                        {isProcessing && (
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        )}
                                        {isProcessing ? 'Procesando...' : 'Confirmar Pedido'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export { SistemaDePago };