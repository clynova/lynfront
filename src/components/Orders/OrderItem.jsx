import PropTypes from 'prop-types';
import { formatCurrency } from '../../utils/funcionesReutilizables';

const OrderItem = ({ order, formatDate, getStatusBadgeColor }) => {
    return (
        <div className="border dark:border-gray-700 rounded-lg p-4">
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
                            {formatCurrency(item.price * item.quantity)}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-4 pt-4 border-t dark:border-gray-700">
                <div className="flex justify-between items-center">
                    <p className="font-medium text-gray-900 dark:text-white">Total</p>
                    <p className="font-bold text-gray-900 dark:text-white">{formatCurrency(order.total)}</p>
                </div>
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
                productId: PropTypes.shape({
                    name: PropTypes.string.isRequired
                }),
                quantity: PropTypes.number.isRequired,
                price: PropTypes.number.isRequired
            })
        ).isRequired,
        total: PropTypes.number.isRequired
    }).isRequired,
    formatDate: PropTypes.func.isRequired,
    getStatusBadgeColor: PropTypes.func.isRequired
};

export { OrderItem };