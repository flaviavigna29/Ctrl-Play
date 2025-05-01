import { useContext } from 'react';
import { Link } from "react-router";
import SearchBar from "../components/SearchBar";
import SessionContext from '../context/SessionContext';
import supabase from '../supabase/supabase-client';

export default function Header() {
    const { session, loading } = useContext(SessionContext);

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    if (loading) {
        return (
            <div className="navbar bg-base-200 shadow-sm fixed top-0 left-0 z-50">
                <div className="flex-1">
                    <Link to="/" className="btn btn-ghost normal-case text-xl font-bold">
                        Ctrl+Play
                    </Link>
                </div>
                <div className="flex gap-2">
                    <button className="btn btn-ghost loading">Loading...</button>
                </div>
            </div>
        );
    }

    return (
        <div className="navbar bg-base-200 shadow-sm fixed top-0 left-0 z-50">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost normal-case text-xl font-bold">
                    Ctrl+Play
                </Link>
            </div>
            <div className="flex gap-2">
                <SearchBar />

                {session ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="User avatar"
                                    src={session.user.user_metadata?.avatar_url || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-200 rounded-box z-10 mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between">
                                    {session.user.email}
                                </a>
                            </li>
                            <Link to="/account" className="btn btn-ghost">
                                Profilo
                            </Link>
                            <li><a>Impostazioni</a></li>
                            <li><button onClick={signOut}>Logout</button></li>
                        </ul>
                    </div>
                ) : (
                    <div className="flex items-center">
                        <Link to="/login" className="btn btn-ghost">
                            Accedi
                        </Link>
                        <Link to="/register" className="btn btn-ghost">
                            Registrati
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}