import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getOrderById } from '../../services/userService';
import { useAuth } from '../../context/AuthContext';
import { getImageUrl } from '../../utils/funcionesReutilizables';

const MyOrderDetails = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useAuth();

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await getOrderById(orderId, token);
                if (response.success) {
                    setOrder(response.order);
                } else {
                    setError(response.message || 'Error al cargar los detalles del pedido');
                }
            } catch (error) {
                setError(error.message || 'Error al cargar los detalles del pedido');
            } finally {
                setLoading(false);
            }
        };

        if (orderId) {
            fetchOrderDetails();
        }
    }, [orderId, token]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
        );
    }

    if (!order) return null;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Detalles del Pedido #{order._id.slice(-6)}
                </h1>
                <button
                    onClick={() => navigate('/profile/orders')}
                    className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                    Volver a Pedidos
                </button>
            </div>

            <div className="space-y-6">
                {/* Estado y Fecha */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h2 className="font-semibold mb-2">Estado del Pedido</h2>
                        <span className={`px-2 py-1 rounded-full text-sm ${
                            order.status === 'completed' ? 'bg-green-100 text-green-800' :
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                        }`}>
                            {order.status === 'completed' ? 'Completado' :
                             order.status === 'pending' ? 'Pendiente' : 'Cancelado'}
                        </span>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h2 className="font-semibold mb-2">Fecha del Pedido</h2>
                        <p>{new Date(order.orderDate).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</p>
                    </div>
                </div>

                {/* Productos */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h2 className="font-semibold mb-4">Productos</h2>
                    <div className="space-y-4">
                        {order.products.map((item) => (
                            <div key={item.product._id} className="flex justify-between items-center border-b dark:border-gray-600 pb-2">
                                <div className="flex items-center space-x-4">
                                    <img 
                                        src={getImageUrl(item.product.images[0])} 
                                        alt={item.product.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div>
                                        <p className="font-medium">{item.product.name}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Cantidad: {item.quantity}
                                        </p>
                                    </div>
                                </div>
                                <p className="font-medium">
                                    ${(item.price * item.quantity).toLocaleString('es-CL')}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Información de Envío */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h2 className="font-semibold mb-4">Información de Envío</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="text-sm font-medium mb-2">Dirección de Envío</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {order.shippingAddress.recipientName}<br />
                                {order.shippingAddress.street}<br />
                                {order.shippingAddress.city}, {order.shippingAddress.state}<br />
                                {order.shippingAddress.country}, {order.shippingAddress.zipCode}<br />
                                Tel: {order.shippingAddress.phoneContact}
                            </p>
                            {order.shippingAddress.additionalInstructions && (
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    Instrucciones: {order.shippingAddress.additionalInstructions}
                                </p>
                            )}
                        </div>
                        <div>
                            <h3 className="text-sm font-medium mb-2">Método de Envío</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {order.shipping.carrier.name} - {order.shipping.method}<br />
                                Costo de envío: ${order.shipping.cost.toLocaleString('es-CL')}
                            </p>
                            {order.shipping.trackingNumber && (
                                <p className="mt-2 text-sm">
                                    Número de seguimiento: {order.shipping.trackingNumber}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Información de Pago */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h2 className="font-semibold mb-4">Información de Pago</h2>
                    <div className="space-y-2">
                        <p>Estado: {order.payment.status === 'completed' ? 'Completado' : 'Pendiente'}</p>
                        <p>Método: {order.payment.provider}</p>
                        {order.payment.paymentDetails && (
                            <>
                                <p>Número de tarjeta: ****{order.payment.paymentDetails.card_detail?.card_number}</p>
                                <p>Código de autorización: {order.payment.paymentDetails.authorization_code}</p>
                                <p>Fecha de transacción: {new Date(order.payment.paymentDetails.transaction_date).toLocaleString('es-ES')}</p>
                            </>
                        )}
                        <div className="mt-4 pt-4 border-t dark:border-gray-600">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span>Subtotal:</span>
                                    <span>${(order.subtotal).toLocaleString('es-CL')}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Costo de envío:</span>
                                    <span>${order.shipping.cost.toLocaleString('es-CL')}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                                    <span>Comisión {order.payment.provider} ({order.payment.commissionPercentage}%):</span>
                                    <span>${order.payment.commissionAmount.toLocaleString('es-CL')}</span>
                                </div>
                                <div className="flex justify-between items-center font-bold text-lg pt-2 border-t dark:border-gray-600">
                                    <span>Total con comisión:</span>
                                    <span>${order.payment.amount.toLocaleString('es-CL')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { MyOrderDetails };