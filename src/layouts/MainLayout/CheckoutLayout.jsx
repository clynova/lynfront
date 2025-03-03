import { Outlet } from 'react-router-dom';

const CheckoutLayout = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8 mt-20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              
                <main className="md:col-span-3">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export { CheckoutLayout };