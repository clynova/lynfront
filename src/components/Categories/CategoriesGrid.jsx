import { CategoryCard } from './CategoryCard';
import imgNeumatico from '../../images/categories/Neumáticos.png';
import imgAccesorios from '../../images/categories/Accesorios.png';
import imgHerramientas from '../../images/categories/Herramientas.png';
import imgLimpieza from '../../images/categories/Limpieza.png';

const categories = [
  {
    title: "Neumáticos",
    description: "Las mejores marcas en neumáticos para tu vehículo",
    image: imgNeumatico,
    href: "/categoria/neumaticos"
  },
  {
    title: "Limpieza",
    description: "Productos especializados para el cuidado de tu auto",
    image: imgLimpieza,
    href: "/categoria/limpieza"
  },
  {
    title: "Accesorios",
    description: "Personaliza y mejora tu experiencia de manejo",
    image: imgAccesorios,
    href: "/categoria/accesorios"
  },
  {
    title: "Herramientas",
    description: "Todo lo necesario para el mantenimiento",
    image: imgHerramientas,
    href: "/categoria/herramientas"
  }
];

const CategoriesGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[600px]">
      {categories.map((category) => (
        <CategoryCard
          key={category.title}
          {...category}
        />
      ))}
    </div>
  );
};

export { CategoriesGrid };
