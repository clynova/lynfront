import { useEffect, useState } from "react";
import { getWishlist } from "../../services/userService";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const MyWishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();
    const [imageError, setImageError] = useState(false);
    const fallbackImage = './images/placeholder.png'; // Añade una imagen por defecto

    const handleImageError = () => {
        setImageError(true);
    };

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await getWishlist(token);
                if (response.success) {
                    setWishlistItems(response.data.products || []);
                }
            } catch (error) {
                console.error('Error al cargar lista de deseos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, [token]);

    if (loading) {
        return <div className="text-center py-4">Cargando lista de deseos...</div>;
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Lista de Deseos</h1>
            </div>

            {wishlistItems.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400 mb-4">Tu lista de deseos está vacía</p>
                    <Link 
                        to="/products" 
                        className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                        Explorar productos
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistItems.map((product) => (
                        <div 
                            key={product._id} 
                            className="border dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            <Link to={`/product/${product._id}`}>
                                <img 
                                    src={imageError || !product.images?.[0] ? fallbackImage : product.images[0]}
                                    alt={product.name}
                                    className="w-full h-48 object-cover"
                                    loading="lazy"
                                    onError={handleImageError}
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                        {product.name}
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-2 line-clamp-2">
                                        {product.description}
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                                            ${product.price}
                                        </span>
                                        <span className={`text-sm ${
                                            product.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                                        }`}>
                                            {product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export { MyWishlist };