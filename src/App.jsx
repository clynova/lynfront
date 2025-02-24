import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { Home } from "./pages/Home";
import { GlobalProvider } from "./context/GlobalContext";
import { PageTitle } from "./components/PageTitle";
import { HelmetProvider } from 'react-helmet-async';
import { MainLayout } from "./layouts/MainLayout/MainLayout";
import { AuthLayout } from "./layouts/AuthLayout/AuthLayout";
import { PasswordResetSuccess } from "./pages/auth/passwordResetSuccess";
import { Categorias } from "./pages/Categorias";
import { CartProvider } from './context/CartContext';
import { NotFound } from "./pages/NotFound";
import { ProductDetails } from "./pages/ProductDetails";
import { MyProfile } from "./pages/Perfil/MyProfile";
import { Toaster } from 'react-hot-toast';
import { VerificationPending } from "./pages/auth/VerificationPending";
import { VerificationSuccess } from "./pages/auth/VerificationSuccess";
import { ProductProvider } from './context/ProductContext';
import { ProfileLayout } from "./layouts/MainLayout/ProfileLayout";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <ProductProvider>
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
                    <Route path="forgot-password" element={<ForgotPassword />} />
                    <Route path="password-confirmada" element={<PasswordResetSuccess />} />
                    <Route path="verification-pending" element={<VerificationPending />} />
                    <Route path="verification-sucess" element={<VerificationSuccess />} />
                  </Route>
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <MainLayout />
                    </ProtectedRoute>
                  }>
                    <Route element={<ProfileLayout />}>
                      <Route index element={<MyProfile />} />
                      <Route path="orders" element={<MyProfile />} />
                      <Route path="wishlist" element={<MyProfile />} />
                      <Route path="addresses" element={<MyProfile />} />
                      <Route path="payment" element={<MyProfile />} />
                      <Route path="settings" element={<MyProfile />} />
                    </Route>
                  </Route>
                  <Route path="/about" element={<div>About</div>} />
                  <Route path="/contact" element={<div>Contact</div>} />
                  <Route path="*" element={<NotFound />} />
                  <Route path="/product/:_id" element={<ProductDetails />} />
                </Routes>
              </BrowserRouter>
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#333',
                    color: '#fff',
                  },
                  success: {
                    duration: 3000,
                    style: {
                      background: '#1db954',
                    },
                  },
                  error: {
                    duration: 4000,
                    style: {
                      background: '#d32f2f',
                    },
                  },
                }}
              />
            </GlobalProvider>
          </HelmetProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
};

export { App };
