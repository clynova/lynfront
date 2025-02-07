import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

const AuthLayout = () => {
    return (
        <>
            <div className="flex flex-col justify-between min-h-screen">
                <Header />

                <main>
                    <Outlet />
                </main>

                <Footer />
            </div>
        </>
    );
};

export { AuthLayout };