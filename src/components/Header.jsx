import React from "react";

const Header = () => {
  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo o nombre de la marca */}
          <div className="flex-shrink-0">
            <a href="/" className="text-xl font-bold text-gray-800">
              Lyn
            </a>
          </div>

          {/* Enlaces del Navbar */}
          <div className="hidden md:flex space-x-8">
            <a href="/about" className="text-gray-800 hover:text-blue-500">
              Inicio
            </a>
            <a href="/blog" className="text-gray-800 hover:text-blue-500">
              Blog
            </a>
            <a href="/pricing" className="text-gray-800 hover:text-blue-500">
              Pricing
            </a>
            <a href="/contact" className="text-gray-800 hover:text-blue-500">
              Contact Us
            </a>
            <a href="/testimonials" className="text-gray-800 hover:text-blue-500">
              Testimonials
            </a>
          </div>

          {/* Botones de Login y Sign Up */}
          <div className="flex items-center space-x-4">
            <a
              href="/login"
              className="text-gray-800 hover:text-blue-500"
            >
              Login
            </a>
            <a
              href="/signup"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export { Header };