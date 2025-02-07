import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, Menu, X } from "lucide-react"; // Íconos de Lucide (opcional)

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Simulación de productos en el carrito (después deberías obtenerlos de tu estado global)
    const cartItems = [
        { id: 1, name: "Producto 1", price: 100, quantity: 1 },
        { id: 2, name: "Producto 2", price: 200, quantity: 1 },
    ];

    return (
        <header className="bg-white shadow-md relative">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">

                {/* LOGO */}
                <Link to="/" className="text-2xl font-bold text-blue-600">
                    AutoAccesorios
                </Link>

                {/* MENÚ HAMBURGUESA (Móvil) */}
                <button
                    className="lg:hidden p-2 text-gray-600"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* MENÚ PRINCIPAL */}
                <nav className={`lg:flex space-x-6 items-center ${isOpen ? "block" : "hidden"} lg:block`}>
                    <Link to="/" className="text-gray-700 hover:text-blue-600">Inicio</Link>
                    <Link to="/productos" className="text-gray-700 hover:text-blue-600">Productos</Link>
                    <Link to="/contacto" className="text-gray-700 hover:text-blue-600">Contacto</Link>
                </nav>

                {/* ÍCONOS */}
                <div className="flex items-center space-x-4">
                    <Link to="/login" className="text-gray-700 hover:text-blue-600">
                        <User size={24} />
                    </Link>
                    <button 
                        onClick={() => setIsCartOpen(!isCartOpen)} 
                        className="relative text-gray-700 hover:text-blue-600"
                    >
                        <ShoppingCart size={24} />
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                            {cartItems.length}
                        </span>
                    </button>
                </div>
            </div>

            {/* Carrito desplegable */}
            {isCartOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white border rounded-lg shadow-lg z-50 p-4 mr-4">
                    <h3 className="text-lg font-semibold mb-4">Carrito de Compras</h3>
                    {cartItems.length > 0 ? (
                        <>
                            <div className="space-y-3">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center">
                                        <div>
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                                        </div>
                                        <p className="font-medium">${item.price}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 pt-4 border-t">
                                <div className="flex justify-between font-semibold">
                                    <span>Total:</span>
                                    <span>${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}</span>
                                </div>
                                <Link 
                                    to="/carrito" 
                                    className="mt-4 block w-full bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700"
                                >
                                    Ver Carrito
                                </Link>
                            </div>
                        </>
                    ) : (
                        <p className="text-gray-500 text-center">No hay productos en el carrito</p>
                    )}
                </div>
            )}
        </header>
    );
};

export { Header };
