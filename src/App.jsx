const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600">Hello World!</h1>
        <p className="mt-4 text-lg text-gray-700">
          Este es un ejemplo de una app React con Tailwind CSS.
        </p>
        <button className="mt-8 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
          Haz clic aquí
        </button>
      </div>
    </div>
  );
};

export { App };