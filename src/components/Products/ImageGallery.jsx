import PropTypes from 'prop-types';

const ImageGallery = ({ images, selectedImage, setSelectedImage }) => {
    return (
        <div className="flex flex-col">
            <div className="relative">
                <img
                    src={images[selectedImage]}
                    alt="Producto seleccionado"
                    className="w-full h-96 object-cover rounded-lg"
                />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`relative rounded-lg overflow-hidden ${selectedImage === idx ? 'ring-2 ring-blue-500' : ''
                            }`}
                    >
                        <img
                            src={img}
                            alt={`Vista ${idx + 1}`}
                            className="w-full h-24 object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );

};

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedImage: PropTypes.number.isRequired,
    setSelectedImage: PropTypes.func.isRequired,
};


export { ImageGallery };