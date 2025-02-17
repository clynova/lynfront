import { useState, useEffect } from 'react';
import { useGlobal } from '../../context/GlobalContext';
import InputField from '../../components/InputField';
import { FiKey } from 'react-icons/fi';
import AuthIllustration from '../../components/AuthIllustration';
import illustration from "../../images/server-illustration-2.svg";

const ValidarToken = () => {
    const { setPageTitle } = useGlobal();
    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const [touched, setTouched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setPageTitle('Validar Token | LynFront');
    }, [setPageTitle]);

    const validateToken = (value) => {
        if (!value) return 'El token es requerido';
        if (value.trim().length < 6) return 'El token debe tener al menos 6 caracteres';
        return '';
    };

    const handleBlur = () => {
        setTouched(true);
        setError(validateToken(token));
    };

    const handleChange = (e) => {
        setToken(e.target.value);
        if (touched) setError(validateToken(e.target.value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTouched(true);
        const validationError = validateToken(token);
        if (validationError) {
            setError(validationError);
            return;
        }
        setIsLoading(true);
        // Simulación de llamada a API para validar el token
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        console.log('Token validado:', token);
        // ... lógica real para procesar el token ...
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center p-8">
                <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Validacion del Token</h1>
                <form className="w-full max-w-md space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <InputField
                            id="token"
                            name="token"
                            label="Token"
                            placeholder="Ingrese su token"
                            type="text"
                            value={token}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            icon={FiKey}
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
                                Validando token...
                            </>
                        ) : (
                            'Validar Token'
                        )}
                    </button>
                </form>
            </div>

            <AuthIllustration illustration={illustration} />
        </>
    );
};

export { ValidarToken };
