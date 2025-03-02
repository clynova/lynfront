import { useEffect, memo } from 'react';
import Slider from 'react-slick';
import { SlArrowLeftCircle, SlArrowRightCircle } from "react-icons/sl";
import { useProducts } from '../../context/ProductContext';
import ProductCard from './ProductCard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Flechas del carrusel mejoradas
const NextArrow = memo(({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2
             bg-white dark:bg-gray-800 rounded-full shadow-lg 
             hover:shadow-xl transition-all duration-300 hover:scale-110
             group"
    aria-label="Siguiente"
  >
    <SlArrowRightCircle className="w-6 h-6 text-gray-600 dark:text-gray-300 
                                  group-hover:text-blue-500 transition-colors" />
  </button>
));

const PrevArrow = memo(({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2
             bg-white dark:bg-gray-800 rounded-full shadow-lg 
             hover:shadow-xl transition-all duration-300 hover:scale-110
             group"
    aria-label="Anterior"
  >
    <SlArrowLeftCircle className="w-6 h-6 text-gray-600 dark:text-gray-300 
                                 group-hover:text-blue-500 transition-colors" />
  </button>
));

// Configuración optimizada del carrusel
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  autoplay: true,
  autoplaySpeed: 4000,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 3,
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        dots: false
      }
    }
  ],
  dotsClass: "slick-dots !bottom-[-2rem]"
};

const BestSellersCarousel = () => {
  const { products, loading, error, fetchProducts } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        Error al cargar los productos: {error}
      </div>
    );
  }

  // Tomamos los primeros 8 productos como más vendidos (esto debería venir del backend)
  const bestSellers = products.slice(0, 8);

  if (bestSellers.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 p-4">
        No hay productos disponibles en este momento.
      </div>
    );
  }

  return (
    <div className="relative px-8 pb-8">
      <Slider {...settings}>
        {bestSellers.map(product => (
          <div key={product._id} className="px-3">
            <ProductCard product={product} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default memo(BestSellersCarousel);