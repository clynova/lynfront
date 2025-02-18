import { useEffect } from "react";
import { useGlobal } from '../context/GlobalContext';
import ProductSlider from '../components/ProductSlider';
import { CategoriesGrid } from '../components/Categories/CategoriesGrid';
import ProductGrid from '../components/ProductGrid';

const Home = () => {
  const { setPageTitle } = useGlobal();

  useEffect(() => {
    setPageTitle('Inicio | LynFront');
  }, [setPageTitle]);

  return (
    <div className="flex flex-col">
      {/* Hero Section con Slider */}
      <section className="w-full h-[80vh] relative">
        <ProductSlider />
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 w-full">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Explora nuestras Categorías
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Encuentra todo lo que necesitas para tu vehículo
          </p>
        </div>
        <CategoriesGrid />
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 w-full">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Productos Destacados
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Descubre nuestra selección de productos premium
          </p>
        </div>
        <ProductGrid />
      </section>
    </div>
  );
};

export { Home };