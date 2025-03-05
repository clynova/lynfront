import { useCart } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getCart } from '../../services/paymentService';
import { getProductById } from '../../services/productService';

const CarroDeCompras = () => {
    const { cartItems, removeFromCart, updateQuantity, validateCartStock, setCartItems } = useCart();
    const { token, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Efecto para recargar los datos del carrito desde la base de datos
    useEffect(() => {
        const refreshCartFromServer = async () => {
            if (isAuthenticated && token && !isRefreshing) {
                // Verificamos si ya se realizó una recarga reciente para evitar duplicaciones con F5
                const lastRefreshTime = localStorage.getItem('lastCartRefresh');
                const now = Date.now();
                
                // Si se ha refrescado en los últimos 3 segundos, omitimos esta actualización
                if (lastRefreshTime && (now - parseInt(lastRefreshTime)) < 3000) {
                    console.log('Recarga reciente detectada, omitiendo actualización');
                    return;
                }
                
                // Marcamos el inicio de la actualización
                setIsRefreshing(true);
                localStorage.setItem('lastCartRefresh', now.toString());
                
                try {
                    // Obtenemos el carrito actualizado del servidor
                    const serverCartResponse = await getCart(token);
                    
                    if (serverCartResponse?.cart?.products && serverCartResponse.cart.products.length > 0) {
                        // Cargar los detalles completos de cada producto
                        const serverCartItems = [];
                        
                        for (const item of serverCartResponse.cart.products) {
                            try {
                                // Obtener detalles del producto
                                const productDetails = await getProductById(item.productId);
                                
                                if (productDetails && productDetails.product) {
                                    const product = productDetails.product;
                                    
                                    // Asegurar que el producto tiene todos los datos necesarios
                                    if (!product.name || !product.images || product.price === undefined) {
                                        console.warn(`Producto ${item.productId} con datos incompletos:`, product);
                                        continue;
                                    }
                                    
                                    // Crear un objeto de carrito completo con todas las propiedades necesarias
                                    serverCartItems.push({
                                        _id: item.productId,
                                        name: product.name,
                                        price: product.price,
                                        images: Array.isArray(product.images) ? product.images : ['placeholder.png'],
                                        quantity: item.quantity,
                                        stock: product.stock || 1,
                                        ...product
                                    });
                                }
                            } catch (error) {
                                console.error(`Error al obtener detalles del producto ${item.productId}:`, error);
                            }
                        }
                        
                        if (serverCartItems.length > 0) {
                            setCartItems(serverCartItems);
                            localStorage.setItem('cart', JSON.stringify(serverCartItems));
                            // Usamos un toast silencioso o lo eliminamos para evitar notificaciones constantes en recargas
                        }
                    }
                } catch (error) {
                    console.error('Error al obtener el carrito del servidor:', error);
                    // Solo mostramos un error si no es un 400 (que suele indicar "carrito vacío")
                    if (error?.response?.status !== 400) {
                        toast.error('Error al cargar el carrito');
                    }
                } finally {
                    setIsRefreshing(false);
                }
            }
        };
        
        refreshCartFromServer();
    }, [isAuthenticated, token, setCartItems]);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleContinue = () => {
        if (!validateCartStock()) {
            return;
        }
        navigate('/checkout/envio');
    };

    // Función auxiliar para asegurar que el stock es un número válido y positivo
    const getValidStock = (stock) => {
        // Si stock es undefined, null o NaN, devolvemos 1 como valor por defecto
        if (stock === undefined || stock === null || isNaN(stock) || stock < 1) {
            return 1;
        }
        // Aseguramos que el valor es un entero
        return Math.floor(stock);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-6">Tu Carrito de Compras</h1>
            
            {cartItems.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">Tu carrito está vacío</p>
                    <Link to="/" className="text-blue-600 hover:text-blue-800">
                        Continuar comprando
                    </Link>
                </div>
            ) : (
                <>
                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <div key={item._id} className="flex items-center justify-between border-b pb-4">
                                <div className="flex items-center space-x-4">
                                    <img 
                                        src={item.images?.[0]} 
                                        alt={item.name} 
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                    <div>
                                        <h3 className="font-medium">{item.name}</h3>
                                        <p className="text-gray-600">${item.price}</p>
                                        <p className="text-sm text-gray-500">
                                            Stock disponible: {getValidStock(item.stock)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <select
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                                        className="border rounded p-1"
                                    >
                                        {Array.from({ length: Math.min(10, getValidStock(item.stock)) }, (_, i) => (
                                            <option key={i + 1} value={i + 1}>
                                                {i + 1}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 flex justify-between items-center">
                        <div>
                            <p className="text-xl font-bold">Total: ${calculateTotal().toFixed(2)}</p>
                        </div>
                        <button
                            onClick={handleContinue}
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                        >
                            Continuar con el envío
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export { CarroDeCompras };