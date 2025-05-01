import { Outlet } from "react-router";
import Header from '../components/Header';
import Footer from '../components/Footer';
import GenresDropdown from '../components/GenresDropdown';

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1">


                <main className="flex flex-1 ">
                    <aside className="w-64 p-2 bg-base-200 pt-20">
                        <GenresDropdown />
                    </aside>
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    );
}