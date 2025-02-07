import { createContext, useContext, useState, useEffect } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [pageName, setPageName] = useState('');
  const [pageTitle, setPageTitle] = useState('LynFront');

  // Actualizar el título del documento cuando cambie pageTitle
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  const value = {
    pageName,
    setPageName,
    pageTitle,
    setPageTitle
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobal debe ser usado dentro de un GlobalProvider');
  }
  return context;
};
