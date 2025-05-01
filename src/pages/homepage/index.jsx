import useFetchSolution from '../../hooks/useFetchSolution';
import CardGame from '../../components/CardGame';
import config from '../../utils/config';

export default function HomePage() {
    const initialUrl = `${config.API_URL}/games?key=${config.API_KEY}&dates=2024-01-01,2024-12-31&page=1`;
    const { data, loading, error } = useFetchSolution(initialUrl);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Popular Games 2024</h1>
            {loading && <div className="text-center py-10">Loading...</div>}
            {error && <div className="text-center py-10 text-error">{error}</div>}
            {data && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {data.results.map(game => (
                        <CardGame key={game.id} game={game} />
                    ))}
                </div>
            )}
        </div>
    );
}