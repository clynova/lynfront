import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <main className="w-full max-w-6xl bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-12 md:flex md:gap-12">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};

export { MainLayout };