import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthLayout } from "./layouts/AuthLayout/AuthLayout";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/login" element={<AuthLayout />}>
          <Route index path="/login" element={<Login />} />
        </Route>
        <Route path="/register" element={<AuthLayout />}>
          <Route index path="/register" element={<Register />} />
        </Route>
        <Route path="/about" element={<div>About</div>} />
        <Route path="/contact" element={<div>Contact</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export { App };