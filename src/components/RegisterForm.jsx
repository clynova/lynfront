import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';
import InputField from './InputField';
import SocialButton from './SocialButton';
import logo from "../images/logo.svg";
import googleIconImageSrc from "../images/google-icon.png";
import twitterIconImageSrc from "../images/twitter-icon.png";

const RegisterForm = ({ onSubmit, handleSocialLogin, formData, onChange }) => {
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
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent font-display">
                        Crea tu cuenta
                    </h1>
                    <p className="text-gray-400">
                        Únete a nuestra comunidad en menos de un minuto
                    </p>
                </header>
                <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <InputField
                            id="nombre"
                            name="nombre"
                            label="Nombre"
                            placeholder="Nombre"
                            icon={FiUser}
                            value={formData.nombre}
                            onChange={onChange}
                            required
                        />
                        <InputField
                            id="apellido"
                            name="apellido"
                            label="Apellido"
                            placeholder="Apellido"
                            icon={FiUser}
                            value={formData.apellido}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <InputField
                        id="email"
                        name="email"
                        label="Correo electrónico"
                        placeholder="Correo electrónico"
                        type="email"
                        icon={FiMail}
                        value={formData.email}
                        onChange={onChange}
                        required
                    />
                    <InputField
                        id="password"
                        name="password"
                        label="Contraseña"
                        placeholder="Contraseña"
                        type="password"
                        icon={FiLock}
                        value={formData.password}
                        onChange={onChange}
                        onHelpClick={() => setShowPasswordHelp(!showPasswordHelp)}
                        showHelp={showPasswordHelp}
                        helpText="La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y un carácter especial."
                        required
                    />
                    <InputField
                        id="repPassword"
                        name="repPassword"
                        label="Repetir Contraseña"
                        placeholder="Contraseña"
                        type="password"
                        icon={FiLock}
                        value={formData.repPassword}
                        onChange={onChange}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full py-4 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600
						           text-white font-medium rounded-xl shadow-lg shadow-green-500/20 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]
						           focus:ring-2 focus:ring-green-400/50 focus:ring-offset-2 focus:ring-offset-gray-900"
                    >
                        Crear cuenta
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
};

export default RegisterForm;
