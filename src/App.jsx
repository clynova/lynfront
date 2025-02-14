import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { ConfirmarCuenta } from "./pages/auth/ConfirmarCuenta";
import { OlvidePassword } from "./pages/auth/OlvidePassword";
import { Home } from "./pages/Home";
import { GlobalProvider } from "./context/GlobalContext";
import { PageTitle } from "./components/PageTitle";
import { HelmetProvider } from 'react-helmet-async';
import { MainLayout } from "./layouts/MainLayout/MainLayout";
import { AuthLayout } from "./layouts/AuthLayout/AuthLayout";

const App = () => {
  return (
    <HelmetProvider>
      <GlobalProvider>
        <PageTitle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
            </Route>
            <Route path="/auth" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="signup" element={<Register />} />
              <Route path="confirmar-cuenta/:token" element={<ConfirmarCuenta />} />
              <Route path="olvide-password" element={<OlvidePassword />} />
            </Route>
            <Route path="/about" element={<div>About</div>} />
            <Route path="/contact" element={<div>Contact</div>} />
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </HelmetProvider>
  );
};

export { App };
