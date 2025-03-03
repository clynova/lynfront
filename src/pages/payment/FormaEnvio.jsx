import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { getAddresses, addAddress } from '../../services/userService';
import { HiPlus } from 'react-icons/hi';
import { AddressForm } from '../Perfil/MyAddresses';
import { toast } from 'react-hot-toast';

const FormaEnvio = () => {
    const [shippingMethod, setShippingMethod] = useState('standard');
    const [selectedAddressId, setSelectedAddressId] = useState('');
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const { token } = useAuth();
    const { saveShippingInfo } = useCart();

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await getAddresses(token);
                if (response.success) {
                    setAddresses(response.data.addresses || []);
                    // Si hay una dirección predeterminada, seleccionarla
                    const defaultAddress = response.data.addresses?.find(addr => addr.isDefault);
                    if (defaultAddress) {
                        setSelectedAddressId(defaultAddress._id);
                    }
                }
            } catch (error) {
                toast.error("Error al cargar las direcciones");
            } finally {
                setLoading(false);
            }
        };

        fetchAddresses();
    }, [token]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedAddressId) {
            toast.error("Por favor selecciona una dirección de envío");
            return;
        }

        const selectedAddress = addresses.find(addr => addr._id === selectedAddressId);
        saveShippingInfo({
            method: shippingMethod,
            address: selectedAddress
        });

        // Navegar a la página de pago
        window.location.href = '/checkout/pago';
    };

    const handleAddressSubmit = async (addressData) => {
        try {
            const response = await addAddress(addressData, token);
            if (response.success && response.data) {
                const newAddress = response.data;
                setAddresses(prev => [...prev, newAddress]);
                setSelectedAddressId(newAddress._id);
                setShowAddressForm(false);
                toast.success("Dirección agregada correctamente");
            }
        } catch (error) {
            toast.error("Error al agregar la dirección");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-48">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-6">Información de Envío</h1>
            
            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Método de Envío</h2>
                <div className="space-y-4">
                    <label className="flex items-center p-4 border rounded cursor-pointer hover:bg-gray-50">
                        <input
                            type="radio"
                            name="shipping"
                            value="standard"
                            checked={shippingMethod === 'standard'}
                            onChange={(e) => setShippingMethod(e.target.value)}
                            className="mr-3"
                        />
                        <div>
                            <p className="font-medium">Envío Estándar</p>
                            <p className="text-gray-600">3-5 días hábiles - Gratis</p>
                        </div>
                    </label>
                    
                    <label className="flex items-center p-4 border rounded cursor-pointer hover:bg-gray-50">
                        <input
                            type="radio"
                            name="shipping"
                            value="express"
                            checked={shippingMethod === 'express'}
                            onChange={(e) => setShippingMethod(e.target.value)}
                            className="mr-3"
                        />
                        <div>
                            <p className="font-medium">Envío Express</p>
                            <p className="text-gray-600">1-2 días hábiles - $99.00</p>
                        </div>
                    </label>
                </div>
            </div>

            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Dirección de Envío</h2>
                    {!showAddressForm && (
                        <button
                            onClick={() => setShowAddressForm(true)}
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                        >
                            <HiPlus className="w-5 h-5" />
                            Nueva dirección
                        </button>
                    )}
                </div>

                {showAddressForm ? (
                    <AddressForm
                        onSubmit={handleAddressSubmit}
                        onCancel={() => setShowAddressForm(false)}
                    />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {addresses.map((address) => (
                            <label
                                key={address._id}
                                className={`flex items-start p-4 border rounded cursor-pointer hover:bg-gray-50 ${
                                    selectedAddressId === address._id ? 'border-blue-500 bg-blue-50' : ''
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="address"
                                    value={address._id}
                                    checked={selectedAddressId === address._id}
                                    onChange={(e) => setSelectedAddressId(e.target.value)}
                                    className="mr-3 mt-1"
                                />
                                <div>
                                    <p className="font-medium">{address.street}</p>
                                    <p className="text-gray-600">{address.city}, {address.state}</p>
                                    <p className="text-gray-600">{address.country}, {address.zipCode}</p>
                                    {address.reference && (
                                        <p className="text-gray-500 text-sm">Ref: {address.reference}</p>
                                    )}
                                    {address.isDefault && (
                                        <span className="text-green-600 text-sm">Predeterminada</span>
                                    )}
                                </div>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex justify-between items-center mt-8">
                <Link
                    to="/checkout"
                    className="text-blue-600 hover:text-blue-800"
                >
                    ← Volver al carrito
                </Link>
                <button
                    onClick={handleSubmit}
                    disabled={!selectedAddressId || showAddressForm}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Continuar al pago
                </button>
            </div>
        </div>
    );
}

export { FormaEnvio };