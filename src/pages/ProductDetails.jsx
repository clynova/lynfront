import { useState, useEffect } from 'react';
import { useGlobal } from '../context/GlobalContext';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ImageGallery } from '../components/Products/ImageGallery';
import { ActionButtons } from '../components/Products/ActionButtons';
import { getProductById } from '../services/productService';

const ProductDetails = () => {
  const { _id } = useParams();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const { setPageTitle } = useGlobal();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await getProductById(_id);
      setProduct(fetchedProduct.product);
    };
    fetchProduct();
  }, [_id]);

  useEffect(() => {
    if (product) {
      setPageTitle(`${product.name} | LynFront`);
    }
  }, [setPageTitle, product]);

  if (!product || !product.images) {
    return <div className="text-center text-2xl mt-20">Producto no encontrado</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" style={{ marginTop: '4rem' }}>
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        {/* Galería de imágenes */}

        <ImageGallery
          images={product.images}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />

        {/* Información del producto */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            {product.name}
          </h1>

          <div className="mt-3">
            <h2 className="sr-only">Información del producto</h2>
            <p className="text-3xl tracking-tight text-gray-900 dark:text-white">
              ${product.price}
            </p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Descripción</h3>
            <p className="text-base text-gray-700 dark:text-gray-300">
              {product.description}
            </p>
          </div>

          <ActionButtons product={product} addToCart={addToCart} />

          {/* Características del producto */}
          <div className="mt-10">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Características</h3>
            <div className="mt-4">
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>Garantía de 12 meses</li>
                <li>Envío gratis</li>
                <li>Devolución gratuita por 30 días</li>
                <li>Stock: {product.stock}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProductDetails };
