import { useEffect } from 'react';
import { useGlobal } from '../../context/GlobalContext';

const MyProfile = () => {
  const { setPageTitle } = useGlobal();

  useEffect(() => {
    setPageTitle('Mi Perfil | LynFront');
  }, [setPageTitle]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold mb-6">Información Personal</h1>
      <div className="space-y-6">
        {/* Aquí va el contenido del perfil */}
      </div>
    </div>
  );
};

export { MyProfile };