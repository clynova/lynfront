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
    const [errors, setErrors] = useState({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        repPassword: '',
    });
    const [touched, setTouched] = useState({
        nombre: false,
        apellido: false,
        email: false,
        password: false,
        repPassword: false,
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setPageTitle('Registro | LynFront');
    }, [setPageTitle]);

    const validateNombre = (value) => value ? '' : 'El nombre es requerido';
    const validateApellido = (value) => value ? '' : 'El apellido es requerido';
    const validateEmail = (value) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!value) return 'El correo es requerido';
        if (!emailRegex.test(value)) return 'Correo electrónico inválido';
        return '';
    };
    const validatePassword = (value) => {
        if (!value) return 'La contraseña es requerida';
        if (value.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
        return '';
    };
    const validateRepPassword = (value) => {
        if (value !== formData.password) return 'Las contraseñas no coinciden';
        return '';
    };

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'nombre':
                error = validateNombre(value);
                break;
            case 'apellido':
                error = validateApellido(value);
                break;
            case 'email':
                error = validateEmail(value);
                break;
            case 'password':
                error = validatePassword(value);
                break;
            case 'repPassword':
                error = validateRepPassword(value);
                break;
            default:
                break;
        }
        setErrors(prev => ({ ...prev, [name]: error }));
        return !error;
    };

    const handleBlur = (name) => {
        setTouched(prev => ({ ...prev, [name]: true }));
        validateField(name, formData[name]);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        if (touched[name]) {
            validateField(name, value);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        // Marcar todos los campos como tocados y validar
        const fields = ['nombre', 'apellido', 'email', 'password', 'repPassword'];
        const touchedFields = {};
        let isValid = true;
        fields.forEach(field => {
            touchedFields[field] = true;
            if (!validateField(field, formData[field])) isValid = false;
        });
        setTouched(touchedFields);
        if (!isValid) return;
        setIsLoading(true);
        // Simular llamada a API
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        console.log('Registrando usuario', formData);
        // ... lógica real de registro ...
    };

    const handleSocialLogin = (provider) => {
        console.log(`Iniciando sesión con ${provider}`);
    };

    return (
        <>
            <AuthIllustration illustration={illustration} />
            <RegisterForm
                onSubmit={handleRegister}
                handleSocialLogin={handleSocialLogin}
                formData={formData}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors}
                touched={touched}
                isLoading={isLoading}
            />
        </>
    );
};

export { Register };