import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CategoryCard = ({ title, image, href, description }) => {
  return (
    <Link
      to={href}
      className="group relative overflow-hidden rounded-2xl bg-gray-900/60 transition-transform hover:scale-[1.02] duration-300"
    >
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover opacity-75 transition-all duration-300 group-hover:scale-110 group-hover:opacity-50"
        />
      </div>
      <div className="relative flex h-full flex-col justify-end bg-gradient-to-t from-gray-900/90 to-transparent p-8">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>
    </Link>
  );
};

CategoryCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export { CategoryCard };
