import { useState, useEffect, useContext } from 'react';
import { FaTrashAlt, FaHeart } from 'react-icons/fa';
import supabase from '../../supabase/supabase-client';
import SessionContext from '../../context/SessionContext';
import FavoritesContext from '../../context/FavoritesContext';
import Avatar from '../../components/Avatar';

export default function AccountPage() {
    const { session } = useContext(SessionContext);
    const { favorites, removeFavorite } = useContext(FavoritesContext);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');

    useEffect(() => {
        let ignore = false;

        const getProfile = async () => {
            setLoading(true);
            const { user } = session;

            const { data, error } = await supabase
                .from('profiles')
                .select('username, first_name, last_name, avatar_url')
                .eq('id', user.id)
                .single();

            if (!ignore) {
                if (error) {
                    console.error(error);
                } else if (data) {
                    setUsername(data.username || '');
                    setFirstName(data.first_name || '');
                    setLastName(data.last_name || '');
                    setAvatarUrl(data.avatar_url);
                }
            }
            setLoading(false);
        };

        if (session) {
            getProfile();
        }

        return () => {
            ignore = true;
        };
    }, [session]);

    const updateProfile = async (event, newAvatarUrl) => {
        event.preventDefault();
        setLoading(true);
        setShowSuccess(false);
        const { user } = session;

        const updates = {
            id: user.id,
            username,
            first_name: firstName,
            last_name: lastName,
            avatar_url: newAvatarUrl || avatarUrl,
            updated_at: new Date(),
        };

        const { error } = await supabase.from('profiles').upsert(updates);

        if (error) {
            alert(error.message);
        } else {
            if (newAvatarUrl) {
                setAvatarUrl(newAvatarUrl);
            }
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }
        setLoading(false);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/4">
                    <div className="card bg-base-200 shadow-md">
                        <div className="card-body p-4">
                            <div className="flex flex-col items-center mb-6">
                                <Avatar
                                    url={avatarUrl}
                                    size={100}
                                    onUpload={(event, url) => updateProfile(event, url)}
                                />
                                <h2 className="text-xl font-bold mt-2">
                                    {firstName || 'User'} {lastName}
                                </h2>
                                <p className="text-sm text-gray-400">@{username || 'username'}</p>
                            </div>

                            <ul className="menu">
                                <li>
                                    <button
                                        className={`${activeTab === 'profile' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('profile')}
                                    >
                                        Profile Settings
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className={`${activeTab === 'favorites' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('favorites')}
                                    >
                                        My Favorites
                                        <span className="badge badge-primary">
                                            {favorites.length}
                                        </span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="lg:w-3/4">
                    {activeTab === 'profile' ? (
                        <div className="card bg-base-200 shadow-md">
                            <div className="card-body">
                                <h1 className="text-3xl font-bold mb-6">Account Settings</h1>

                                {showSuccess && (
                                    <div className="alert alert-success mb-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>Profile updated successfully!</span>
                                    </div>
                                )}

                                <form onSubmit={updateProfile}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Email</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="input input-bordered"
                                                value={session?.user?.email || ''}
                                                disabled
                                            />
                                        </div>

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Username</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="input input-bordered"
                                                required
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                            />
                                        </div>

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">First Name</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="input input-bordered"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                        </div>

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Last Name</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="input input-bordered"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <button
                                            type="submit"
                                            className="btn btn-primary w-full"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <span className="loading loading-spinner"></span>
                                                    Updating...
                                                </>
                                            ) : (
                                                'Update Profile'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    ) : (
                        <div className="card bg-base-200 shadow-md">
                            <div className="card-body">
                                <h1 className="text-3xl font-bold mb-6">My Favorites</h1>

                                {favorites.length === 0 ? (
                                    <div className="text-center py-8">
                                        <FaHeart className="mx-auto text-4xl text-gray-400 mb-4" />
                                        <p className="text-lg">You don't have any favorites yet</p>
                                        <p className="text-sm text-gray-400 mt-2">
                                            Click the heart icon on games to add them here
                                        </p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {favorites.map((game) => (
                                            <div key={game.id} className="card bg-base-100 shadow-sm">
                                                <figure>
                                                    <img
                                                        src={game.game_image}
                                                        alt={game.game_name}
                                                        className="w-full h-40 object-cover"
                                                    />
                                                </figure>
                                                <div className="card-body p-4">
                                                    <h3 className="card-title text-sm line-clamp-1">
                                                        {game.game_name}
                                                    </h3>
                                                    <div className="card-actions justify-end">
                                                        <button
                                                            className="btn btn-sm btn-error"
                                                            onClick={() => removeFavorite(game)}
                                                        >
                                                            <FaTrashAlt />
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}