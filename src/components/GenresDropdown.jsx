import useFetchSolution from '../hooks/useFetchSolution';
import { Link } from 'react-router';
import config from '../utils/config';


export default function GenresDropdown() {
    const initialUrl = `${config.API_URL}/genres?key=${config.API_KEY}`;
    const { data, loading, error } = useFetchSolution(initialUrl);

    if (loading) return <div className="text-center py-2">Loading genres...</div>;
    if (error) return <div className="text-error p-4">{error}</div>;

    return (
        <div className="p-2">
            {/* <h2 className="text-xl font-bold mb-4">Game Genres</h2> */}
            <ul className="menu bg-base-200 rounded-box w-56">
                {data?.results.map(genre => (
                    <li key={genre.id}>
                        <Link to={`/games/${genre.slug}`}>
                            {genre.name}
                            <span className="badge badge-neutral ml-2">
                                {genre.games_count}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}