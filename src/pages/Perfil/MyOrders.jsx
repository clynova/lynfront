import { useEffect, useState } from "react";
import { getOrders } from "../../services/userService";
import { useAuth } from "../../context/AuthContext";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getOrders(token);
                console.log(response)
                if (response.success) {
                    setOrders(response.orders);
                }
            } catch (error) {
                console.error('Error al cargar órdenes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [token]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getStatusBadgeColor = (status) => {
        const statusColors = {
            pending: 'bg-yellow-100 text-yellow-800',
            completed: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800'
        };
        return statusColors[status] || 'bg-gray-100 text-gray-800';
    };

    if (loading) {
        return <div className="text-center py-4">Cargando órdenes...</div>;
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Mis Pedidos</h1>
            
            {orders.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">No tienes pedidos realizados.</p>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order._id} className="border dark:border-gray-700 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Pedido #{order._id.slice(-8)}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {formatDate(order.orderDate)}
                                    </p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm ${getStatusBadgeColor(order.status)}`}>
                                    {order.status}
                                </span>
                            </div>

                            <div className="space-y-3">
                                {order.products.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center">
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">
                                                {item.productId.name}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Cantidad: {item.quantity}
                                            </p>
                                        </div>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            ${item.price * item.quantity}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 pt-4 border-t dark:border-gray-700">
                                <div className="flex justify-between items-center">
                                    <p className="font-medium text-gray-900 dark:text-white">Total</p>
                                    <p className="font-bold text-gray-900 dark:text-white">${order.total}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export { MyOrders };