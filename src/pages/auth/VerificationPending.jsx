import { useLocation, Link } from 'react-router-dom';
import { HiMail } from 'react-icons/hi';

const VerificationPending = () => {
    const location = useLocation();
    const { email, message } = location.state || {};

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
                <div className="text-center">
                    <HiMail className="mx-auto h-12 w-12 text-indigo-600" />
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">
                        Verifica tu correo
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        {message || `Hemos enviado un correo de verificación a ${email}`}
                    </p>
                </div>
                <div className="mt-8 space-y-6">
                    <div className="text-sm text-center">
                        <Link
                            to="/auth/login"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Volver al inicio de sesión
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerificationPending;
