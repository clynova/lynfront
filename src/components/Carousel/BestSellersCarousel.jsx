import { useEffect } from 'react';
import Slider from 'react-slick';
import NextArrow from './NextArrow'; // Asegúrate de importar tus componentes de flechas
import PrevArrow from './PrevArrow';
import { useProducts } from '../../context/ProductContext';
import ProductCard from './ProductCard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Función para obtener los productos más vendidos
const useBestSellers = (products, limit = 8) => {
    return products.slice(0, limit);
};

// Configuración del carrusel
const useCarouselSettings = () => ({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow onClick={() => { }} />, // Pasa la función onClick
    prevArrow: <PrevArrow onClick={() => { }} />, // Pasa la función onClick
    responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 2 } },
        { breakpoint: 640, settings: { slidesToShow: 1 } }
    ]
});

const BestSellersCarousel = () => {
    const { products, loading, error, fetchProducts } = useProducts();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const bestSellers = useBestSellers(products);
    const settings = useCarouselSettings();

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="relative px-4 py-6">
            {bestSellers.length > 0 ? (
                <Slider {...settings}>
                    {bestSellers.map(product => (
                        <ProductCard
                            key={String(product._id)}
                            product={{
                                ...product,
                                _id: String(product._id),
                                images: product.images || [] // Aseguramos que images siempre sea un array
                            }}
                        />
                    ))}
                </Slider>
            ) : (
                <p>No hay productos disponibles</p>
            )}
        </div>
    );
};

export default BestSellersCarousel;