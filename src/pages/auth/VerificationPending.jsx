import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HiMail } from 'react-icons/hi';
import { validarToken, reenviarToken } from '../../services/authService';
import { toast } from 'react-hot-toast';

const VerificationPending = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { email, message } = location.state || {};
    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Protección contra acceso directo
    useEffect(() => {
        if (!email) {
            navigate('/auth');
            toast.error('Acceso no válido a la página de verificación');
        }
    }, [email, navigate]);

    const handleVerifyToken = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        try {
            if (!token.trim()) {
                setError('Por favor, ingresa un token.');
                return;
            }

            const data = await validarToken(token, email);
            console.log(data)
            if (data.success) {
                console.log('exito')
                setSuccess(true);
                toast.success('¡Verificación exitosa!');
                // Redirigir al login después de 2 segundos
                setTimeout(() => {
                    navigate('/auth');
                }, 2000);
            } else {
                setError(data.message);
            }
        } catch (err) {
            console.error('Error al verificar el token:', err);
            setError('Ocurrió un error al verificar el token. Por favor, intenta nuevamente.');
        }
    };

    const handleResendToken = async () => {
        try {
            await reenviarToken(email);
            toast.success('Se ha reenviado el código de verificación');
        } catch (error) {
            toast.error('Error al reenviar el código', error);
        }
    };

    if (!email) {
        return null; // No renderizar nada mientras se redirecciona
    }

    return (
        <div className="w-full bg-white items-center  shadow-lg rounded-lg p-8 flex flex-col ">
            <HiMail className="text-6xl text-blue-500 mb-6" />
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Verifica tu cuenta</h2>
            <p className="text-lg text-gray-600 text-center mb-4">{message}</p>
            <p className="text-lg text-gray-600 text-center mb-4">
                Se ha enviado un correo a <strong>{email}</strong> con un enlace para verificar tu cuenta.
            </p>
            <p className="text-gray-600 text-center mb-6">
                Si no recibiste el correo, revisa tu carpeta de spam o{' '}
                <button 
                    onClick={handleResendToken}
                    className="text-blue-500 hover:text-blue-600 font-medium"
                >
                    reenviar correo
                </button>
            </p>

            {/* Formulario para ingresar el token */}
            <form onSubmit={handleVerifyToken} className="w-full max-w-md">
                <div className="mb-4">
                    <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-2">
                        Ingresa el codigo enviado a tu correo:
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