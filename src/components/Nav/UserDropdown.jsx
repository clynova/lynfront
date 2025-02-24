import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiUser, HiShoppingBag, HiCog, HiLogout, HiShoppingCart } from 'react-icons/hi';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { formateoNombre } from '../../utils/funcionesReutilizables';

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();
  const { setIsCartOpen } = useCart();
  const { logout, isLoggingOut, user } = useAuth();
  const navigate = useNavigate();

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const menuItems = [
    { icon: <HiUser className="w-5 h-5" />, label: 'Mi Perfil', to: '/profile' },
    { icon: <HiShoppingCart className="w-5 h-5" />, label: 'Carrito', onClick: () => setIsCartOpen(true) },
    { icon: <HiShoppingBag className="w-5 h-5" />, label: 'Mis Compras', to: '/orders' },
    { icon: <HiCog className="w-5 h-5" />, label: 'Configuración', to: '/settings' },
    { icon: <HiLogout className="w-5 h-5" />, label: 'Cerrar Sesión', onClick: handleLogout },
  ];


  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors duration-200"
      >
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
          alt="Avatar"
          className="w-8 h-8 rounded-full border-2 border-blue-500"
        />
        <span className="font-medium"> {formateoNombre(user.firstName, user.lastName)} </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-gray-800 shadow-lg py-1 z-50">
          {menuItems.map((item, index) => (
            item.onClick ? (
              <button
                key={index}
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
                disabled={item.label === 'Cerrar Sesión' && isLoggingOut}
                className={`w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
                  ${item.label === 'Cerrar Sesión' && isLoggingOut ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ) : (
              <Link
                key={index}
                to={item.to}
                className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
