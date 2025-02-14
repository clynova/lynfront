// Home.jsx
import { useEffect } from "react";
import { useGlobal } from '../context/GlobalContext';

const Home = () => {
  const { setPageTitle } = useGlobal();

  // Actualizar el nombre de la página y el título cuando el componente se monta
  useEffect(() => {
    const newPageName = 'Inicio';
    setPageTitle(`${newPageName} | LynFront`);
  }, [setPageTitle]);

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 text-white ">Bienvenido a nuestra tienda de accesorios para automóviles</h1>
      {/* Más contenido de la página de inicio */}
      Aqui agregamos el contenido
    </>
  );
};

export { Home };