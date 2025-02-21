import { useGlobal } from '../../context/GlobalContext';
import { useState, useEffect } from 'react';
import { FiMail } from 'react-icons/fi';
import InputField from '../../components/Auth/InputField';
import AuthIllustration from '../../components/Auth/AuthIllustration';
import illustration from "../../images/email-illustration.svg";

const ForgotPassword = () => {
    const { setPageTitle } = useGlobal();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [touched, setTouched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setPageTitle('Recuperar Contraseña | LynFront');
    }, [setPageTitle]);

    const validateEmail = (value) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!value) return 'El correo es requerido';
        if (!emailRegex.test(value)) return 'Correo electrónico inválido';
        return '';
    };

    const handleBlur = () => {
        setTouched(true);
        setError(validateEmail(email));
    };

    const handleChange = (e) => {
        setEmail(e.target.value);
        if (touched) setError(validateEmail(e.target.value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTouched(true);
        const validationError = validateEmail(email);
        if (validationError) {
            setError(validationError);
            return;
        }
        setIsLoading(true);
        // Simulación de llamada a API
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        console.log('Enviando enlace de recuperación a:', email);
        // ... lógica real para enviar enlace de recuperación ...
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center p-8">
                <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Recuperar Contraseña</h1>
                <form className="w-full max-w-md space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <InputField
                            id="email"
                            name="email"
                            label="Correo electrónico"
                            placeholder="Correo electrónico"
                            type="email"
                            value={email}
                            icon={FiMail}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        />
                        {error && touched && (
                            <p className="mt-1 text-sm text-red-500">{error}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex items-center justify-center w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                </svg>
                                Enviando enlace...
                            </>
                        ) : (
                            'Enviar Enlace'
                        )}
                    </button>
                </form>
            </div>
            <AuthIllustration illustration={illustration} />
        </>
    );
};

export { ForgotPassword };