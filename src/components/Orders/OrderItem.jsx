import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const OrderItem = ({ order, formatDate, getStatusBadgeColor }) => {
    const navigate = useNavigate();

    const totalProducts = order.products.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <div 
            onClick={() => navigate(`/profile/orders/${order._id}`)}
            className="bg-white dark:bg-gray-700 rounded-lg shadow p-4 hover:shadow-lg transition-shadow cursor-pointer"
        >
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium">Pedido #{order._id.slice(-6)}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeColor(order.status)}`}>
                            {order.status === 'completed' ? 'Completado' : 
                             order.status === 'pending' ? 'Pendiente' : 'Cancelado'}
                        </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Fecha: {formatDate(order.orderDate)}
                    </p>
                    <div className="mt-2">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {totalProducts} producto{totalProducts !== 1 ? 's' : ''}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Envío: {order.shipping.carrier.name} - {order.shipping.method}
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="font-bold text-lg">${order.total.toLocaleString('es-CL')}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {order.payment.provider}
                    </p>
                </div>
            </div>
            <div className="mt-3 text-indigo-600 text-sm hover:text-indigo-800">
                Ver detalles →
            </div>
        </div>
    );
};

OrderItem.propTypes = {
    order: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        orderDate: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        products: PropTypes.arrayOf(
            PropTypes.shape({
                product: PropTypes.shape({
                    name: PropTypes.string.isRequired,
                }),
                quantity: PropTypes.number.isRequired,
                price: PropTypes.number.isRequired
            })
        ).isRequired,
        total: PropTypes.number.isRequired,
        shipping: PropTypes.shape({
            carrier: PropTypes.shape({
                name: PropTypes.string.isRequired
            }).isRequired,
            method: PropTypes.string.isRequired
        }).isRequired,
        payment: PropTypes.shape({
            provider: PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    formatDate: PropTypes.func.isRequired,
    getStatusBadgeColor: PropTypes.func.isRequired
};

export { OrderItem };