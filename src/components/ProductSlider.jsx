import { useState, useEffect } from 'react';
import img1 from '../images/sliders/premium.webp'; // Actualizado a formato WebP
import img2 from '../images/sliders/oferta.webp';  // Actualizado a formato WebP
import img3 from '../images/sliders/masvendidos.webp';  // Actualizado a formato WebP
import { SlArrowLeftCircle, SlArrowRightCircle } from "react-icons/sl";

const slides = [
  {
    image: img1,
    title: "Accesorios Premium",
    description: "Descubre nuestra nueva colección 2024",
    cta: "Ver Colección"
  },
  {
    image: img2,
    title: "Ofertas Especiales",
    description: "Hasta 50% de descuento en productos seleccionados",
    cta: "Ver Ofertas"
  },
  {
    image: img3,
    title: "Lo Más Vendido",
    description: "Los productos favoritos de nuestros clientes",
    cta: "Explorar"
  }
];

const ProductSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((current + 1) % slides.length);
  const prevSlide = () => setCurrent(current === 0 ? slides.length - 1 : current - 1);

  return (
    <div className="relative h-full overflow-hidden">
      {/* Slides */}
      <div className="absolute inset-0 flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 relative">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center text-white max-w-2xl px-4">
                <h2 className="text-5xl font-bold mb-4">{slide.title}</h2>
                <p className="text-xl mb-8">{slide.description}</p>
                <button className="bg-white text-black px-8 py-3 rounded-full 
                                 font-semibold hover:bg-gray-200 transition-colors">
                  {slide.cta}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 
                  bg-white/30 p-2 rounded-full hover:bg-white/50 transition-colors">
        <SlArrowLeftCircle /> {/* Reemplazar con un ícono */}
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 
                  bg-white/30 p-2 rounded-full hover:bg-white/50 transition-colors">
        <SlArrowRightCircle /> {/* Reemplazar con un ícono */}
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-colors
              ${current === index ? 'bg-white' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;
