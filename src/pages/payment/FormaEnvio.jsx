import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { getAddresses, addAddress } from '../../services/userService';
import { HiPlus } from 'react-icons/hi';
import { AddressForm } from '../Perfil/MyAddresses';
import { toast } from 'react-hot-toast';
import { getShippingMethods } from '../../services/shippingMethods';

const FormaEnvio = () => {
    const [shippingMethods, setShippingMethods] = useState([]);
    const [selectedCarrier, setSelectedCarrier] = useState(null);
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [selectedAddressId, setSelectedAddressId] = useState('');
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [recipientInfo, setRecipientInfo] = useState({
        recipientName: '',
        phoneContact: '',
        additionalInstructions: ''
    });
    const { token } = useAuth();
    const { saveShippingInfo } = useCart();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch addresses
                const addressResponse = await getAddresses(token);
                if (addressResponse.success) {
                    setAddresses(addressResponse.data.addresses || []);
                    const defaultAddress = addressResponse.data.addresses?.find(addr => addr.isDefault);
                    if (defaultAddress) {
                        setSelectedAddressId(defaultAddress._id);
                    }
                }

                // Fetch shipping methods
                const shippingResponse = await getShippingMethods(token);
                if (shippingResponse.success) {
                    setShippingMethods(shippingResponse.data);
                    if (shippingResponse.data.length > 0) {
                        setSelectedCarrier(shippingResponse.data[0]._id);
                        if (shippingResponse.data[0].methods.length > 0) {
                            setSelectedMethod(shippingResponse.data[0].methods[0]._id);
                        }
                    }
                }
            } catch (error) {
                toast.error("Error al cargar los datos");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedAddressId) {
            toast.error("Por favor selecciona una dirección de envío");
            return;
        }
        if (!selectedMethod) {
            toast.error("Por favor selecciona un método de envío");
            return;
        }
        if (!recipientInfo.recipientName || !recipientInfo.phoneContact) {
            toast.error("Por favor completa la información del destinatario");
            return;
        }

        const selectedAddress = addresses.find(addr => addr._id === selectedAddressId);
        const carrier = shippingMethods.find(c => c._id === selectedCarrier);
        const method = carrier?.methods.find(m => m._id === selectedMethod);

        saveShippingInfo({
            carrierId: selectedCarrier,
            carrierName: carrier?.name,
            methodId: selectedMethod,
            methodName: method?.name,
            deliveryTime: method?.delivery_time,
            baseCost: method?.base_cost,
            extraCostPerKg: method?.extra_cost_per_kg,
            address: selectedAddress,
            recipientInfo: recipientInfo
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

    const handleRecipientInfoChange = (e) => {
        const { name, value } = e.target;
        setRecipientInfo(prev => ({
            ...prev,
            [name]: value
        }));
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
                    {shippingMethods.map((carrier) => (
                        <div key={carrier._id} className="border rounded-lg p-4">
                            <h3 className="font-medium text-lg mb-3">{carrier.name}</h3>
                            <div className="space-y-3">
                                {carrier.methods.map((method) => (
                                    <label key={method._id} 
                                           className={`flex items-center p-4 border rounded cursor-pointer hover:bg-gray-50 ${
                                               selectedMethod === method._id ? 'border-blue-500 bg-blue-50' : ''
                                           }`}>
                                        <input
                                            type="radio"
                                            name="shipping"
                                            value={method._id}
                                            checked={selectedMethod === method._id}
                                            onChange={() => {
                                                setSelectedCarrier(carrier._id);
                                                setSelectedMethod(method._id);
                                            }}
                                            className="mr-3"
                                        />
                                        <div>
                                            <p className="font-medium">{method.name}</p>
                                            <p className="text-gray-600">{method.delivery_time}</p>
                                            <p className="text-gray-600">
                                                Costo base: ${method.base_cost.toFixed(2)} 
                                                {method.extra_cost_per_kg > 0 && ` + $${method.extra_cost_per_kg}/kg adicional`}
                                            </p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
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
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
                        
                        {selectedAddressId && (
                            <div className="mt-6 space-y-4 border rounded-lg p-4">
                                <h3 className="font-medium text-lg mb-3">Información del destinatario</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Nombre del destinatario *
                                        </label>
                                        <input
                                            type="text"
                                            name="recipientName"
                                            value={recipientInfo.recipientName}
                                            onChange={handleRecipientInfoChange}
                                            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                                            required
                                            placeholder="Nombre completo"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Teléfono de contacto *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phoneContact"
                                            value={recipientInfo.phoneContact}
                                            onChange={handleRecipientInfoChange}
                                            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                                            required
                                            placeholder="+56912345678"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Instrucciones adicionales
                                        </label>
                                        <textarea
                                            name="additionalInstructions"
                                            value={recipientInfo.additionalInstructions}
                                            onChange={handleRecipientInfoChange}
                                            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                                            rows="2"
                                            placeholder="Instrucciones para la entrega (opcional)"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
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
                    disabled={!selectedAddressId || !selectedMethod || showAddressForm}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Continuar al pago
                </button>
            </div>
        </div>
    );
}

export { FormaEnvio };