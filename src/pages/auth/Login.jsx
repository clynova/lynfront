import { useGlobal } from '../../context/GlobalContext';
import { useEffect } from 'react';
import logo from "../../images/logo.svg";
import googleIconImageSrc from "../../images/google-icon.png";
import twitterIconImageSrc from "../../images/twitter-icon.png";
import illustration from "../../images/login-illustration.svg";

const Login = () => {
    const { setPageTitle } = useGlobal();

    const handleLogin = () => {

        console.log('Iniciando sesión');
    };

    useEffect(() => {
        const newPageName = 'Ingresar';
        setPageTitle(`${newPageName} | LynFront`);
    }, [setPageTitle]);

    const logoLinkUrl = "#";
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
    const signupUrl = "#";

    return (
        <>
            <div className="w-full md:w-1/2 space-y-8">
                <header className="text-center">
                    <img src={logo} alt="Logo" className="h-16 mx-auto mb-6" />
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Regístrate para continuar</h1>
                    <p className="text-gray-600 dark:text-gray-400">Crea tu cuenta en pocos segundos</p>
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

                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2 dark:text-gray-300">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-gray-700
                     border-gray-200 dark:border-gray-600 focus:border-blue-500
                     focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 dark:text-gray-300">Contraseña</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-gray-700
                     border-gray-200 dark:border-gray-600 focus:border-blue-500
                     focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600
                   text-white rounded-lg font-semibold transition-colors duration-300
                   focus:outline-none focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800"
                    >
                        Ingresar
                    </button>
                </form>

                <footer className="text-center text-sm text-gray-600 dark:text-gray-400">
                    <p>¿Ya tienes una cuenta?{" "}
                        <a href={signupUrl} className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                            Inicia sesión
                        </a>
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