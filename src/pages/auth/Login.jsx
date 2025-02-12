import { useGlobal } from '../../context/GlobalContext';
import { useEffect } from 'react';
import logo from "../../images/logo.svg";
import googleIconImageSrc from "../../images/google-icon.png";
import twitterIconImageSrc from "../../images/twitter-icon.png";
import illustration from "../../images/login-illustration.svg";

const Login = () => {
    const { setPageTitle } = useGlobal();

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
        <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center p-4">
            <div className="w-4/5 bg-white text-gray-900 shadow-md rounded-lg p-6 md:flex md:items-center"> {/* Ajuste ancho del contenedor */}
                <div className="w-full md:w-1/2">
                    <a href={logoLinkUrl} className="block text-center mb-8">
                        <img src={logo} alt="Logo" className="h-12 mx-auto" />
                    </a>

                    <div className="text-center">
                        <h1 className="text-2xl font-extrabold">Registrate para continuar</h1>
                    </div>

                    <div className="mt-6">
                        {socialButtons.map((socialButton, index) => (
                            <a
                                key={index}
                                href={socialButton.url}
                                className="w-full flex items-center justify-center px-4 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200 transition text-sm mt-4"
                            >
                                <img src={socialButton.iconImageSrc} className="w-5 h-5" alt="Icon" />
                                <span className="ml-3">{socialButton.text}</span>
                            </a>
                        ))}
                    </div>

                    <div className="my-6 text-center text-gray-600 text-sm">O registrate con tu correo electrónico</div>

                    <form className="space-y-4">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-4 py-3 border rounded-lg bg-gray-100 focus:outline-none focus:border-gray-400"
                        />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className="w-full px-4 py-3 border rounded-lg bg-gray-100 focus:outline-none focus:border-gray-400"
                        />
                        <button
                            type="submit"
                            className="w-full py-3.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-primary-600 active:bg-primary-700 transition-colors focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                        >
                            Ingresar
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <p>Al registrarte, aceptas nuestros Términos de servicio y Política de privacidad.</p>
                        <p className="mt-4">
                            ¿Ya tienes una cuenta? <a href={signupUrl} className="text-primary-500">Inicia sesión</a>
                        </p>
                    </div>

                </div>

                <div className="hidden md:block md:w-1/2 md:pl-8"> {/* Agregado padding a la izquierda */}
                    <img src={illustration} alt="Illustration" className="w-3/4 h-auto" /> {/* Ajuste ancho de imagen */}
                </div>
            </div>
        </section>
    );
};

export { Login };