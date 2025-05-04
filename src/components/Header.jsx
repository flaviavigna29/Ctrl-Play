import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router";
import SearchBar from "../components/SearchBar";
import SessionContext from '../context/SessionContext';
import supabase from '../supabase/supabase-client';

export default function Header() {
    const { session, loading } = useContext(SessionContext);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!session?.user) return;

        const fetchUsername = async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select('username')
                .eq('id', session.user.id)
                .single();

            if (!error && data?.username) {
                setUsername(data.username);
            } else {
                setUsername(session.user.email.split('@')[0]);
            }
        };

        fetchUsername();
    }, [session]);

    const signOut = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    if (loading) {
        return (
            <div className="navbar bg-base-200 shadow-sm fixed top-0 left-0 z-50">
                <div className="flex-1">
                    <Link to="/" className="btn btn-ghost normal-case text-xl font-bold">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-joystick" viewBox="0 0 16 16">
                            <path d="M10 2a2 2 0 0 1-1.5 1.937v5.087c.863.083 1.5.377 1.5.726 0 .414-.895.75-2 .75s-2-.336-2-.75c0-.35.637-.643 1.5-.726V3.937A2 2 0 1 1 10 2" />
                            <path d="M0 9.665v1.717a1 1 0 0 0 .553.894l6.553 3.277a2 2 0 0 0 1.788 0l6.553-3.277a1 1 0 0 0 .553-.894V9.665c0-.1-.06-.19-.152-.23L9.5 6.715v.993l5.227 2.178a.125.125 0 0 1 .001.23l-5.94 2.546a2 2 0 0 1-1.576 0l-5.94-2.546a.125.125 0 0 1 .001-.23L6.5 7.708l-.013-.988L.152 9.435a.25.25 0 0 0-.152.23" />
                        </svg>
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
        <div className="navbar bg-base-200 shadow-sm fixed top-0 left-0 z-50 px-4">
            <div className="flex-1 flex md:hidden items-center">
                <label htmlFor="sidebar-drawer" className="btn btn-ghost drawer-button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </label>
                <Link to="/" className="btn btn-ghost normal-case text-xl font-bold px-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-joystick" viewBox="0 0 16 16">
                        <path d="M10 2a2 2 0 0 1-1.5 1.937v5.087c.863.083 1.5.377 1.5.726 0 .414-.895.75-2 .75s-2-.336-2-.75c0-.35.637-.643 1.5-.726V3.937A2 2 0 1 1 10 2" />
                        <path d="M0 9.665v1.717a1 1 0 0 0 .553.894l6.553 3.277a2 2 0 0 0 1.788 0l6.553-3.277a1 1 0 0 0 .553-.894V9.665c0-.1-.06-.19-.152-.23L9.5 6.715v.993l5.227 2.178a.125.125 0 0 1 .001.23l-5.94 2.546a2 2 0 0 1-1.576 0l-5.94-2.546a.125.125 0 0 1 .001-.23L6.5 7.708l-.013-.988L.152 9.435a.25.25 0 0 0-.152.23" />
                    </svg>
                    <span className="hidden sm:inline">Ctrl+Play</span>
                </Link>
                
                <div className="flex-none ml-auto">
                    {session ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-neutral">
                                <span className="hidden xs:inline">{username || 'Profile'}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 xs:ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                </svg>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-200 rounded-box z-10 mt-3 w-52 p-2 shadow">
                                <li><Link to="/account">Account</Link></li>
                                <li><Link to="/favorites">Favorites</Link></li>
                                <li><button onClick={signOut}>Logout</button></li>
                            </ul>
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-ghost px-2">Login</Link>
                            <Link to="/register" className="btn btn-primary px-2">Register</Link>
                        </>
                    )}
                </div>
            </div>

            <div className="hidden md:flex w-full">
                <div className="flex-1">
                    <Link to="/" className="btn btn-ghost normal-case text-xl font-bold">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-joystick" viewBox="0 0 16 16">
                            <path d="M10 2a2 2 0 0 1-1.5 1.937v5.087c.863.083 1.5.377 1.5.726 0 .414-.895.75-2 .75s-2-.336-2-.75c0-.35.637-.643 1.5-.726V3.937A2 2 0 1 1 10 2" />
                            <path d="M0 9.665v1.717a1 1 0 0 0 .553.894l6.553 3.277a2 2 0 0 0 1.788 0l6.553-3.277a1 1 0 0 0 .553-.894V9.665c0-.1-.06-.19-.152-.23L9.5 6.715v.993l5.227 2.178a.125.125 0 0 1 .001.23l-5.94 2.546a2 2 0 0 1-1.576 0l-5.94-2.546a.125.125 0 0 1 .001-.23L6.5 7.708l-.013-.988L.152 9.435a.25.25 0 0 0-.152.23" />
                        </svg>
                        Ctrl+Play
                    </Link>
                </div>
                <div className="flex-1 flex justify-center">
                    <SearchBar />
                </div>
                <div className="flex-1 flex justify-end gap-2">
                    {session ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-neutral">
                                {username || 'Profile'}
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-200 rounded-box z-10 mt-3 w-52 p-2 shadow">
                                <li><Link to="/account">Account</Link></li>
                                <li><button onClick={signOut}>Logout</button></li>
                            </ul>
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-ghost">Login</Link>
                            <Link to="/register" className="btn btn-primary">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}