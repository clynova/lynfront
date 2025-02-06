import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthLayout } from "./layouts/AuthLayout/AuthLayout";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { ConfirmarCuenta } from "./pages/auth/ConfirmarCuenta";
import { OlvidePassword } from "./pages/auth/OlvidePassword";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/login" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="confirmar-cuenta/:token" element={<ConfirmarCuenta />} />
          <Route path="olvide-password" element={<OlvidePassword />} />
        </Route>
        <Route path="/about" element={<div>About</div>} />
        <Route path="/contact" element={<div>Contact</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export { App };
