import { useGlobal } from '../../context/GlobalContext';
import { useEffect, useState } from 'react';
import LoginForm from '../../components/Auth/LoginForm';
import AuthIllustration from '../../components/Auth/AuthIllustration';
import illustration from "../../images/login-illustration.svg";

const Login = () => {
  const { setPageTitle } = useGlobal();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
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
    const emailValid = validateField('email', formData.email);
    const passwordValid = validateField('password', formData.password);
    setTouched({ email: true, password: true });
    if (!emailValid || !passwordValid) return;
    setIsLoading(true);
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Datos del formulario:', formData);
      // Aquí se implementaría la lógica de autenticación real
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPageTitle('Ingresar | LynFront');
  }, [setPageTitle]);

  return (
    <>
      <LoginForm
        onSubmit={handleLogin}
        formData={formData}
        handleInputChange={handleInputChange}
        handleBlur={handleBlur}
        errors={errors}
        touched={touched}
        isLoading={isLoading}
      />
      <AuthIllustration illustration={illustration} />
    </>
  );
};

export { Login };