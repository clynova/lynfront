// MainLayout.jsx
import React from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet /> {/* Aquí se renderiza el contenido de la página */}
      </main>
      <Footer />
    </div>
  );
};

export { MainLayout };