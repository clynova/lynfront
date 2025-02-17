import { useGlobal } from '../../context/GlobalContext';
import { useEffect, useState } from 'react';
import RegisterForm from '../../components/RegisterForm';
import AuthIllustration from '../../components/AuthIllustration';
import illustration from "../../images/login-illustration.svg";

const Register = () => {
    const { setPageTitle } = useGlobal();

    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        repPassword: '',
    });

    useEffect(() => {
        setPageTitle('Registro | LynFront');
    }, [setPageTitle]);

    const handleRegister = (e) => {
        e.preventDefault();
        console.log('Registrando usuario', formData);
    };

    const handleSocialLogin = (provider) => {
        console.log(`Iniciando sesión con ${provider}`);
    };

    const handleChange = (e) => {
        console.log(e.target.name, e.target.value);
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            <AuthIllustration illustration={illustration} />
            <RegisterForm
                onSubmit={handleRegister}
                handleSocialLogin={handleSocialLogin}
                formData={formData}
                onChange={handleChange}
            />
        </>
    );
};

export { Register };