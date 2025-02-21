import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { ConfirmarCuenta } from "./pages/auth/ConfirmarCuenta";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { Home } from "./pages/Home";
import { GlobalProvider } from "./context/GlobalContext";
import { PageTitle } from "./components/PageTitle";
import { HelmetProvider } from 'react-helmet-async';
import { MainLayout } from "./layouts/MainLayout/MainLayout";
import { AuthLayout } from "./layouts/AuthLayout/AuthLayout";
import { ValidarToken } from "./pages/auth/ValidarToken";
import { CuentaConfirmada } from "./pages/auth/cuentaConfirmada";
import { PasswordResetSuccess } from "./pages/auth/passwordResetSuccess";
import { Categorias } from "./pages/Categorias";
import { CartProvider } from './context/CartContext';
import { NotFound } from "./pages/NotFound";
import { ProductDetails } from "./pages/ProductDetails";
import { Perfil } from "./pages/Perfil";

const App = () => {
  return (
    <CartProvider>
      <HelmetProvider>
        <GlobalProvider>
          <PageTitle />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="product/:_id" element={<ProductDetails />} />
              </Route>
              <Route path="/categoria/:nombre" element={<MainLayout />}>
                <Route index element={<Categorias />} />
              </Route>
              <Route path="/auth" element={<AuthLayout />}>
                <Route index element={<Login />} />
                <Route path="signup" element={<Register />} />
                <Route path="confirmar-cuenta/:token" element={<ConfirmarCuenta />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="validar-token" element={<ValidarToken />} />
                <Route path="cuenta-confirmada" element={<CuentaConfirmada />} />
                <Route path="password-confirmada" element={<PasswordResetSuccess />} />
              </Route>
              <Route path="/perfil" element={<MainLayout />}>
                <Route index element={<Perfil />} />
              </Route>
              <Route path="/about" element={<div>About</div>} />
              <Route path="/contact" element={<div>Contact</div>} />
              <Route path="*" element={<NotFound />} />
              <Route path="/product/:_id" element={<ProductDetails />} />
            </Routes>
          </BrowserRouter>
        </GlobalProvider>
      </HelmetProvider>
    </CartProvider>
  );
};

export { App };
