import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';
import InputField from './InputField';
import SocialButton from './SocialButton';
import logo from "../images/logo.svg";
import googleIconImageSrc from "../images/google-icon.png";
import twitterIconImageSrc from "../images/twitter-icon.png";

const RegisterForm = ({ onSubmit, handleSocialLogin, formData, onChange, onBlur, errors, touched, isLoading }) => {
    const [showPasswordHelp, setShowPasswordHelp] = useState(false);

    const socialButtons = [
        {
            iconImageSrc: googleIconImageSrc,
            alt: "Google",
            onClick: () => handleSocialLogin('Google'),
        },
        {
            iconImageSrc: twitterIconImageSrc,
            alt: "Twitter",
            onClick: () => handleSocialLogin('Twitter'),
        },
    ];

    return (
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
            <div className="w-full max-w-md space-y-8">
                <header className="text-center space-y-4">
                    <img src={logo} alt="Logo" className="h-16 mx-auto mb-6 animate-pulse" />
                    <h1 className="text-4xl font-bold bg-gradient-to-r text-gray-800 dark:text-white bg-clip-text text-transparent font-display">
                        Crea tu cuenta
                    </h1>
                    <p className="text-gray-400">
                        Únete a nuestra comunidad en menos de un minuto
                    </p>
                </header>
                <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <InputField
                                id="nombre"
                                name="nombre"
                                label="Nombre"
                                placeholder="Nombre"
                                icon={FiUser}
                                value={formData.nombre}
                                onChange={onChange}
                                onBlur={() => onBlur('nombre')}
                                required
                            />
                            {errors.nombre && touched.nombre && (
                                <p className="mt-1 text-sm text-red-500">{errors.nombre}</p>
                            )}
                        </div>
                        <div>
                            <InputField
                                id="apellido"
                                name="apellido"
                                label="Apellido"
                                placeholder="Apellido"
                                icon={FiUser}
                                value={formData.apellido}
                                onChange={onChange}
                                onBlur={() => onBlur('apellido')}
                                required
                            />
                            {errors.apellido && touched.apellido && (
                                <p className="mt-1 text-sm text-red-500">{errors.apellido}</p>
                            )}
                        </div>
                    </div>
                    <div>
                        <InputField
                            id="email"
                            name="email"
                            label="Correo electrónico"
                            placeholder="Correo electrónico"
                            type="email"
                            icon={FiMail}
                            value={formData.email}
                            onChange={onChange}
                            onBlur={() => onBlur('email')}
                            required
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
                            onChange={onChange}
                            onBlur={() => onBlur('password')}
                            onHelpClick={() => setShowPasswordHelp(!showPasswordHelp)}
                            showHelp={showPasswordHelp}
                            helpText="La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y un carácter especial."
                            required
                        />
                        {errors.password && touched.password && (
                            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                        )}
                    </div>
                    <div>
                        <InputField
                            id="repPassword"
                            name="repPassword"
                            label="Repetir Contraseña"
                            placeholder="Contraseña"
                            type="password"
                            icon={FiLock}
                            value={formData.repPassword}
                            onChange={onChange}
                            onBlur={() => onBlur('repPassword')}
                            required
                        />
                        {errors.repPassword && touched.repPassword && (
                            <p className="mt-1 text-sm text-red-500">{errors.repPassword}</p>
                        )}
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
                                Creando cuenta...
                            </>
                        ) : (
                            'Crear cuenta'
                        )}
                    </button>
                </form>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-gray-900 text-gray-400">O continúa con</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {socialButtons.map((btn, index) => (
                        <SocialButton
                            key={index}
                            {...btn}
                        />
                    ))}
                </div>
                <footer className="text-center text-sm text-gray-400">
                    <p>
                        ¿Ya tienes cuenta?{" "}
                        <Link
                            to="/auth"
                            className="text-green-400 hover:text-green-300 font-medium transition-colors"
                        >
                            Iniciar sesión
                        </Link>
                    </p>
                </footer>
            </div>
        </div>
    );
};

RegisterForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    handleSocialLogin: PropTypes.func.isRequired,
    formData: PropTypes.shape({
        nombre: PropTypes.string.isRequired,
        apellido: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        repPassword: PropTypes.string.isRequired,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    errors: PropTypes.shape({
        nombre: PropTypes.string,
        apellido: PropTypes.string,
        email: PropTypes.string,
        password: PropTypes.string,
        repPassword: PropTypes.string,
    }).isRequired,
    touched: PropTypes.shape({
        nombre: PropTypes.bool,
        apellido: PropTypes.bool,
        email: PropTypes.bool,
        password: PropTypes.bool,
        repPassword: PropTypes.bool,
    }).isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export default RegisterForm;
