import { Outlet } from "react-router";
import { useState, useEffect } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import GenresDropdown from '../components/GenresDropdown';

export default function Layout() {
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        
        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    return (
        <div className="drawer md:drawer-open">
            <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 pt-20 overflow-y-auto">
                    <Outlet />
                </main>
                <Footer />
            </div>
            <div className="drawer-side z-40">
                <label htmlFor="sidebar-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <aside className="w-64 min-h-full bg-base-200 pt-20">
                    <GenresDropdown closeSidebar={() => {
                        if (isMobile) {
                            document.getElementById('sidebar-drawer').checked = false;
                        }
                    }} />
                </aside>
            </div>
        </div>
    );
}