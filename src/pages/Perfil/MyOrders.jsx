import { useEffect, useState } from "react";
import { getOrders } from "../../services/userService";
import { useAuth } from "../../context/AuthContext";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(5);
    const { token } = useAuth();
    const [sortOrder, setSortOrder] = useState('desc'); // 'desc' o 'asc'
    const [statusFilter, setStatusFilter] = useState('all');

    const statusOptions = {
        all: 'Todos',
        pending: 'Pendiente',
        completed: 'Completado',
        canceled: 'Cancelado'
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getOrders(token);
                if (response.success) {
                    let filteredOrders = response.orders;
                    
                    // Aplicar filtro por status
                    if (statusFilter !== 'all') {
                        filteredOrders = filteredOrders.filter(order => order.status === statusFilter);
                    }

                    // Ordenar por fecha
                    const sortedOrders = filteredOrders.sort((a, b) => {
                        return sortOrder === 'desc' 
                            ? new Date(b.orderDate) - new Date(a.orderDate)
                            : new Date(a.orderDate) - new Date(b.orderDate);
                    });
                    
                    setOrders(sortedOrders);
                }
            } catch (error) {
                console.error('Error al cargar órdenes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [token, sortOrder, statusFilter]);

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };

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
            canceled: 'bg-red-100 text-red-800'
        };
        return statusColors[status] || 'bg-gray-100 text-gray-800';
    };

    // Obtener órdenes de la página actual
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(orders.length / ordersPerPage);

    // Función para cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Componente Paginador
    const Pagination = () => {
        return (
            <div className="flex justify-center space-x-2 mt-6">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded-md ${
                        currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                >
                    Anterior
                </button>
                
                <div className="flex space-x-2">
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            className={`px-3 py-1 rounded-md ${
                                currentPage === index + 1
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded-md ${
                        currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                >
                    Siguiente
                </button>
            </div>
        );
    };

    if (loading) {
        return <div className="text-center py-4">Cargando órdenes...</div>;
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mis Pedidos</h1>
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                    <div className="flex items-center space-x-2">
                        <label className="text-sm text-gray-600 dark:text-gray-300">Estado:</label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-1 text-sm bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                        >
                            {Object.entries(statusOptions).map(([value, label]) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <label className="text-sm text-gray-600 dark:text-gray-300">Ordenar por fecha:</label>
                        <select
                            value={sortOrder}
                            onChange={handleSortChange}
                            className="border border-gray-300 rounded-md px-3 py-1 text-sm bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                        >
                            <option value="desc">Más recientes primero</option>
                            <option value="asc">Más antiguos primero</option>
                        </select>
                    </div>
                </div>
            </div>

            {orders.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">No tienes pedidos realizados.</p>
            ) : (
                <div className="space-y-4">
                    {currentOrders.map((order) => (
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
            <Pagination />
        </div>
    );
};

export { MyOrders };