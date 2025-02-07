// Home.jsx
import { useEffect } from "react";
import { MainLayout } from '../layouts/MainLayout/MainLayout';
import { useGlobal } from '../context/GlobalContext';


const Home = () => {
  const { pageName, setPageName, setPageTitle } = useGlobal();

  // Actualizar el nombre de la página y el título cuando el componente se monta
  useEffect(() => {
    const newPageName = 'Inicio';
    setPageTitle(`${newPageName} | LynFront`);
  }, [setPageTitle]);

  return (
    <MainLayout>
      <h1>Bienvenido a nuestra tienda de accesorios para automóviles</h1>
      {/* Más contenido de la página de inicio */}
    </MainLayout>
  );
};

export { Home };