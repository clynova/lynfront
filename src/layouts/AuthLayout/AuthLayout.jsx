import { Outlet } from "react-router-dom";
import { AuthHeader } from "./AuthHeader";
import { Footer } from "../../components/Footer";

const AuthLayout = () => {
    return (
        <>
            <div className="flex flex-col justify-between min-h-screen">
                <AuthHeader />

                <main>
                    <Outlet />
                </main>

                <Footer />
            </div>
        </>
    );
};

export { AuthLayout };