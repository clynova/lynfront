import { useGlobal } from '../../context/GlobalContext';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from "../../images/logo.svg";
import googleIconImageSrc from "../../images/google-icon.png";
import twitterIconImageSrc from "../../images/twitter-icon.png";
import illustration from "../../images/login-illustration.svg";

const Login = () => {
    const { setPageTitle } = useGlobal();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });
    const [touched, setTouched] = useState({
        email: false,
        password: false
    });

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!email) return 'El correo es requerido';
        if (!emailRegex.test(email)) return 'Correo electrónico inválido';
        return '';
    };

    const validatePassword = (password) => {
        if (!password) return 'La contraseña es requerida';
        if (password.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
        return '';
    };

    const handleBlur = (field) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        validateField(field, formData[field]);
    };

    const validateField = (name, value) => {
        let error = '';
        if (name === 'email') error = validateEmail(value);
        if (name === 'password') error = validatePassword(value);
        
        setErrors(prev => ({ ...prev, [name]: error }));
        return !error;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (touched[name]) {
            validateField(name, value);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        
        // Validar todos los campos
        const emailValid = validateField('email', formData.email);
        const passwordValid = validateField('password', formData.password);
        
        setTouched({ email: true, password: true });

        if (!emailValid || !passwordValid) return;

        setIsLoading(true);
        try {
            // Simular llamada a API
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log('Datos del formulario:', formData);
            // Aquí iría la lógica de autenticación real
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const newPageName = 'Ingresar';
        setPageTitle(`${newPageName} | LynFront`);
    }, [setPageTitle]);

    const socialButtons = [
        {
            iconImageSrc: googleIconImageSrc,
            text: "Ingresar con Google",
            url: "https://google.com"
        },
        {
            iconImageSrc: twitterIconImageSrc,
            text: "Ingresar con X",
            url: "https://twitter.com"
        }
    ];
    const signupUrl = "/auth/signup";

    return (
        <>
            <div className="w-full md:w-1/2 space-y-8">
                <header className="text-center">
                    <img src={logo} alt="Logo" className="h-16 mx-auto mb-6" />
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Ingresa para continuar</h1>
                    <p className="text-gray-600 dark:text-gray-400">Ingresa con tu cuenta existente</p>
                </header>

                <div className="space-y-4">
                    {socialButtons.map((socialButton, index) => (
                        <a
                            key={index}
                            href={socialButton.url}
                            className="flex items-center justify-center gap-3 w-full px-6 py-3.5
                     border-2 rounded-xl bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600
                     transition-colors duration-200 text-gray-800 dark:text-white"
                        >
                            <img src={socialButton.iconImageSrc} className="w-6 h-6" alt="" />
                            <span className="font-medium">{socialButton.text}</span>
                        </a>
                    ))}
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">o regístrate con email</span>
                    </div>
                </div>

                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label className="block text-sm font-medium mb-2 dark:text-gray-300">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            onBlur={() => handleBlur('email')}
                            className={`w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-gray-700
                                     ${errors.email && touched.email 
                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                                        : 'border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-200'}
                                     transition-all`}
                        />
                        {errors.email && touched.email && (
                            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 dark:text-gray-300">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            onBlur={() => handleBlur('password')}
                            className={`w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-gray-700
                                     ${errors.password && touched.password 
                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                                        : 'border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-200'}
                                     transition-all`}
                        />
                        {errors.password && touched.password && (
                            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                        )}
                        <Link to="/forgot-password" className="block mt-2 text-sm text-blue-600 hover:underline">
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-3.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 
                                 dark:hover:bg-blue-600 text-white rounded-lg font-semibold 
                                 transition-all duration-300 flex items-center justify-center
                                 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Iniciando sesión...
                            </>
                        ) : 'Ingresar'}
                    </button>
                </form>

                <footer className="text-center text-sm text-gray-600 dark:text-gray-400">
                    <p>No tienes una cuenta?{" "}
                        <Link to={signupUrl} className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                            Registrate
                        </Link>
                    </p>
                </footer>
            </div>

            {/* Sección de ilustración */}
            <div className="hidden md:flex md:w-1/2 items-center justify-center p-4">
                <img
                    src={illustration}
                    alt="Ilustración"
                    className="w-full max-w-md object-contain rounded-xl"
                />
            </div>
        </>
    );
};

export { Login };