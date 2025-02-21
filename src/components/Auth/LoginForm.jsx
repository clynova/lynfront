import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import InputField from './InputField';
import SocialButton from './SocialButton';
import logo from "../../images/logo.svg";
import googleIconImageSrc from "../../images/google-icon.png";
import twitterIconImageSrc from "../../images/twitter-icon.png";
import { FiMail, FiLock } from 'react-icons/fi';

const LoginForm = ({
    onSubmit,
    formData,
    handleInputChange,
    handleBlur,
    errors,
    touched,
    isLoading,
}) => {
    const socialButtons = [
        {
            iconImageSrc: googleIconImageSrc,
            alt: "Google",
            onClick: () => console.log("Ingresar con Google"),
        },
        {
            iconImageSrc: twitterIconImageSrc,
            alt: "Twitter",
            onClick: () => console.log("Ingresar con Twitter"),
        },
    ];

    return (
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
            <div className="w-full max-w-md space-y-8">
                <header className="text-center space-y-4">
                    <img src={logo} alt="Logo" className="h-16 mx-auto mb-6" />
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                        Ingresa para continuar
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Ingresa con tu cuenta existente
                    </p>
                </header>

                <div className="grid grid-cols-2 gap-4">
                    {socialButtons.map((btn, index) => (
                        <SocialButton key={index} {...btn} />
                    ))}
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                            o regístrate con email
                        </span>
                    </div>
                </div>

                <form className="space-y-6" onSubmit={onSubmit}>
                    <div>
                        <InputField
                            id="email"
                            name="email"
                            label="Email"
                            placeholder="Email"
                            type="email"
                            icon={FiMail}
                            value={formData.email}
                            onChange={handleInputChange}
                            onBlur={() => handleBlur('email')}
                        />
                        {errors.email && touched.email && (
                            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                        )}
                    </div>
                    <div>
                        <InputField
                            id="password"
                            name="password"
                            label="Contraseña"
                            placeholder="Contraseña"
                            type="password"
                            icon={FiLock}
                            value={formData.password}
                            onChange={handleInputChange}
                            onBlur={() => handleBlur('password')}
                        />
                        {errors.password && touched.password && (
                            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                        )}
                        <Link to="/auth/forgot-password" className="block mt-2 text-sm text-blue-600 hover:underline">
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-3.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 
                                   text-white rounded-lg font-semibold transition-all duration-300 flex items-center justify-center
                                   ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? (
                            <>
                                <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Iniciando sesión...
                            </>
                        ) : (
                            'Ingresar'
                        )}
                    </button>
                </form>

                <footer className="text-center text-sm text-gray-600 dark:text-gray-400">
                    <p>
                        No tienes una cuenta?{" "}
                        <Link
                            to="/auth/signup"
                            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                        >
                            Regístrate
                        </Link>
                    </p>
                </footer>
            </div>
        </div>
    );
};

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    formData: PropTypes.shape({
        email: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
    }).isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    errors: PropTypes.shape({
        email: PropTypes.string,
        password: PropTypes.string,
    }).isRequired,
    touched: PropTypes.shape({
        email: PropTypes.bool,
        password: PropTypes.bool,
    }).isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export default LoginForm;
