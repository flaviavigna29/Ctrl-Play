import { useEffect } from "react";
import { useSearchParams } from "react-router";
import CardGame from "../../components/CardGame";
import useFetchSolution from "../../hooks/useFetchSolution";
import config from '../../utils/config';

export default function SearchPage() {
    let [searchParams] = useSearchParams();
    const game = searchParams.get("query");

    const initialUrl = `${config.API_URL}/games?key=${config.API_KEY}&search=${encodeURIComponent(game)}`;

    const { loading, data, error, updateUrl } = useFetchSolution(initialUrl);

    useEffect(() => {
        if (game) {
            updateUrl(initialUrl);
        }
    }, [game, initialUrl, updateUrl]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Risultati per: {game}</h1>
            {loading && <p>loading...</p>}
            {error && <h1>{error}</h1>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data?.results?.map((game) => <CardGame key={game.id} game={game}/>)}
            </div>
        </div>
    );
}