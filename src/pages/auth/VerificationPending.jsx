import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { HiMail } from 'react-icons/hi';
// Importa la instancia de Axios configurada

const VerificationPending = () => {
    const location = useLocation();
    const { email, message } = location.state || {};
    const [token, setToken] = useState(''); // Estado para almacenar el token ingresado
    const [error, setError] = useState(''); // Estado para manejar errores
    const [success, setSuccess] = useState(false); // Estado para manejar el éxito

    // Función para manejar la validación del token
    const handleVerifyToken = async (e) => {
        e.preventDefault(); // Evita el comportamiento predeterminado del formulario
        setError(''); // Limpia el mensaje de error
        setSuccess(false); // Limpia el estado de éxito

        try {
            if (!token.trim()) {
                setError('Por favor, ingresa un token.');
                return;
            }

            // Envía el token al backend para validarlo
            const response = await api.post('/auth/verify-token', { token, email });

            if (response.data.success) {
                setSuccess(true); // Marca como éxito
                setError(''); // Limpia el mensaje de error
            } else {
                setError(response.data.message || 'El token no es válido.');
            }
        } catch (err) {
            console.error('Error al verificar el token:', err);
            setError('Ocurrió un error al verificar el token. Por favor, intenta nuevamente.');
        }
    };

    return (


        <div className="w-full bg-white flex items-center  shadow-lg rounded-lg p-8 flex flex-col items-center">
            <HiMail className="text-6xl text-blue-500 mb-6" />
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Verifica tu cuenta</h2>
            <p className="text-lg text-gray-600 text-center mb-4">{message}</p>
            <p className="text-lg text-gray-600 text-center mb-4">
                Se ha enviado un correo a <strong>{email}</strong> con un enlace para verificar tu cuenta.
            </p>
            <p className="text-gray-600 text-center mb-6">
                Si no recibiste el correo, revisa tu carpeta de spam o{' '}
                <Link to="/auth/verification-pending" className="text-blue-500 hover:text-blue-600 font-medium">
                    reenviar correo
                </Link>
                .
            </p>

            {/* Formulario para ingresar el token */}
            <form onSubmit={handleVerifyToken} className="w-full max-w-md">
                <div className="mb-4">
                    <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-2">
                        Ingresa el token enviado a tu correo:
                    </label>
                    <input
                        type="text"
                        id="token"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Ejemplo: 123456"
                    />
                </div>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                {success && (
                    <p className="text-green-500 text-sm mb-4">
                        ¡Tu cuenta ha sido verificada exitosamente! Puedes iniciar sesión ahora.
                    </p>
                )}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                >
                    Verificar token
                </button>
            </form>
        </div>

    );
};

export { VerificationPending };