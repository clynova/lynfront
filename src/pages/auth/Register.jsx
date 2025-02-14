import { useGlobal } from '../../context/GlobalContext';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../images/logo.svg";
import illustration from "../../images/login-illustration.svg";

const Register = () => {
    const { setPageTitle } = useGlobal();

    useEffect(() => {
        setPageTitle('Registro | LynFront');
    }, [setPageTitle]);

    const handleRegister = (e) => {
        e.preventDefault();
        console.log('Registrando usuario');
    };

    return (
        <>
            <div className="w-1/2 hidden md:flex items-center justify-center p-10 bg-gray-800">
                <img src={illustration} alt="Illustration" className="max-w-md w-full h-auto object-contain opacity-90" />
            </div>
            
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 bg-gradient-to-br from-gray-800 to-gray-900">
                <div className="max-w-md w-full space-y-8">
                    <header className="text-center space-y-4">
                        <img src={logo} alt="Logo" className="h-16 mx-auto mb-6" />
                        <h1 className="text-4xl font-bold text-blue-100 font-[Poppins]">Únete a nosotros</h1>
                        <p className="text-blue-200/70">Crea tu cuenta en menos de 1 minuto</p>
                    </header>

                    <form className="space-y-6" onSubmit={handleRegister}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-blue-100 mb-2">Nombre</label>
                                <input 
                                    type="text" 
                                    required 
                                    className="w-full px-4 py-3.5 border-2 border-gray-700/50 rounded-xl bg-gray-800/50 text-gray-100
                                             focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/10 
                                             transition-all placeholder:text-gray-500"
                                    placeholder="Ej: María"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-100 mb-2">Apellido</label>
                                <input 
                                    type="text" 
                                    required 
                                    className="w-full px-4 py-3.5 border-2 border-gray-700/50 rounded-xl bg-gray-800/50 text-gray-100
                                             focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/10 
                                             transition-all placeholder:text-gray-500"
                                    placeholder="Ej: González"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-blue-100 mb-2">Correo electrónico</label>
                            <input 
                                type="email" 
                                required 
                                className="w-full px-4 py-3.5 border-2 border-gray-700/50 rounded-xl bg-gray-800/50 text-gray-100
                                         focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/10 
                                         transition-all placeholder:text-gray-500"
                                placeholder="tucorreo@ejemplo.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-blue-100 mb-2">Contraseña</label>
                            <input 
                                type="password" 
                                required 
                                className="w-full px-4 py-3.5 border-2 border-gray-700/50 rounded-xl bg-gray-800/50 text-gray-100
                                         focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/10 
                                         transition-all placeholder:text-gray-500"
                                placeholder="••••••••"
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="w-full py-4 bg-gradient-to-r from-blue-600/80 to-blue-700/80 hover:from-blue-600 hover:to-blue-700 
                                     text-white font-semibold rounded-xl shadow-lg hover:shadow-xl 
                                     transition-all duration-300 transform hover:scale-[1.02]"
                        >
                            Crear cuenta
                        </button>
                    </form>

                    <footer className="text-center text-sm text-blue-200/70">
                        <p>¿Ya tienes cuenta?{" "}
                            <Link 
                                to="/login" 
                                className="text-blue-100 font-semibold underline hover:text-white transition-colors"
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