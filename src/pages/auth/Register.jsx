import { useGlobal } from '../../context/GlobalContext';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiMail, FiLock } from 'react-icons/fi'; // Necesitarás instalar react-icons
import logo from "../../images/logo.svg";
import illustration from "../../images/login-illustration.svg";
import googleIconImageSrc from "../../images/google-icon.png";
import twitterIconImageSrc from "../../images/twitter-icon.png";

const Register = () => {
    const { setPageTitle } = useGlobal();

    useEffect(() => {
        setPageTitle('Registro | LynFront');
    }, [setPageTitle]);

    const handleRegister = (e) => {
        e.preventDefault();
        console.log('Registrando usuario');
    };

    const handleSocialLogin = (provider) => {
        console.log(`Iniciando sesión con ${provider}`);
        // Aquí implementarías la lógica de autenticación social
    };

    const socialButtons = [
        {
            iconImageSrc: googleIconImageSrc,
            text: "Ingresar con Google",
            onClick: () => handleSocialLogin('Google'),
            url: "https://google.com"
        },
        {
            iconImageSrc: twitterIconImageSrc,
            text: "Ingresar con X",
            onClick: () => handleSocialLogin('Twitter'),
            url: "https://twitter.com"
        }
    ];

    return (
        <>
            {/* Sección de ilustración */}
            <div className="hidden lg:flex w-1/2 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]"></div>
                <div className="absolute inset-0 flex items-center justify-center p-10">
                    <img
                        src={illustration}
                        alt="Illustration"
                        className="max-w-2xl w-full h-auto object-contain animate-float filter drop-shadow-2xl"
                    />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-32   to-transparent"></div>
            </div>

            {/* Sección del formulario */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 bg-slate-900">
                <div className="w-full max-w-md space-y-8">
                    <header className="text-center space-y-4">
                        <img src={logo} alt="Logo" className="h-16 mx-auto mb-6 animate-pulse" />
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent font-display">
                            Crea tu cuenta
                        </h1>
                        <p className="text-slate-400">Únete a nuestra comunidad en menos de un minuto</p>
                    </header>

                    <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-400">
                                    <FiUser className="h-5 w-5" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    placeholder="Nombre"
                                    className="block w-full pl-12 pr-4 py-3.5 text-sm rounded-xl bg-slate-800/50
                                             border border-slate-700 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20
                                             text-slate-200 placeholder:text-slate-500
                                             transition duration-200 ease-in-out transform hover:border-slate-600"
                                />
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-400">
                                    <FiUser className="h-5 w-5" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    placeholder="Apellido"
                                    className="block w-full pl-12 pr-4 py-3.5 text-sm rounded-xl bg-slate-800/50
                                             border border-slate-700 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20
                                             text-slate-200 placeholder:text-slate-500
                                             transition duration-200 ease-in-out transform hover:border-slate-600"
                                />
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-400">
                                <FiMail className="h-5 w-5" />
                            </div>
                            <input
                                type="email"
                                required
                                placeholder="Correo electrónico"
                                className="block w-full pl-12 pr-4 py-3.5 text-sm rounded-xl bg-slate-800/50
                                         border border-slate-700 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20
                                         text-slate-200 placeholder:text-slate-500
                                         transition duration-200 ease-in-out transform hover:border-slate-600"
                            />
                        </div>

                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-400">
                                <FiLock className="h-5 w-5" />
                            </div>
                            <input
                                type="password"
                                required
                                placeholder="Contraseña"
                                className="block w-full pl-12 pr-4 py-3.5 text-sm rounded-xl bg-slate-800/50
                                         border border-slate-700 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20
                                         text-slate-200 placeholder:text-slate-500
                                         transition duration-200 ease-in-out transform hover:border-slate-600"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600
                                     text-white font-medium rounded-xl shadow-lg shadow-blue-500/20
                                     transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]
                                     focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2 focus:ring-offset-slate-900"
                        >
                            Crear cuenta
                        </button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-slate-900 text-slate-400">O continúa con</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {socialButtons.map((socialButton, index) => (
                            <button 
                                key={index} 
                                onClick={socialButton.onClick}
                                className="flex items-center justify-center px-4 py-3 border border-slate-700 rounded-xl
                                       hover:border-slate-600 bg-slate-800/30 transition-colors duration-200"
                            >
                                <img src={socialButton.iconImageSrc} alt={socialButton.text} className="w-5 h-5" />
                            </button>
                        ))}
                    </div>

                    <footer className="text-center text-sm text-slate-400">
                        <p>¿Ya tienes cuenta?{" "}
                            <Link
                                to="/login"
                                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                            >
                                Iniciar sesión
                            </Link>
                        </p>
                    </footer>
                </div>
            </div>
        </>
    );
};

export { Register };