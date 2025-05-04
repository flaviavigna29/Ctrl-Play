import useFetchSolution from '../hooks/useFetchSolution';
import { Link } from 'react-router';
import config from '../utils/config';
import SearchBar from "../components/SearchBar";


export default function GenresDropdown() {
    const initialUrl = `${config.API_URL}/genres?key=${config.API_KEY}`;
    const { data, loading, error } = useFetchSolution(initialUrl);

    if (loading) return <div className="text-center py-2">Loading genres...</div>;
    if (error) return <div className="text-error p-4">{error}</div>;

    return (
        <div className="p-2">
            <div className="md:hidden my-5">
                <SearchBar mobile />
            </div>
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