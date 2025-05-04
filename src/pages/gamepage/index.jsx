import { useParams } from "react-router";
import useFetchSolution from '../../hooks/useFetchSolution';
import config from '../../utils/config';
import ToggleFavorite from '../../components/ToggleFavorite';
import Chatbox from '../../components/Chatbox';

export default function GamePage() {
    const { id } = useParams();
    const initialUrl = `${config.API_URL}/games/${id}?key=${config.API_KEY}`;
    const { data: game, loading, error } = useFetchSolution(initialUrl);

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center py-10 text-error">{error}</div>;
    if (!game) return <div className="text-center py-10">Game not found</div>;

    return (
        <div className="container mx-auto px-4 py-8 pt-5">
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3">
                    <div className="flex items-center gap-4 mb-4">
                        <h1 className="text-4xl font-bold">{game.name}</h1>
                        <ToggleFavorite game={game} />
                    </div>
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: game.description }} />
                </div>

                <div className="lg:w-1/3">
                    <div className="card bg-base-200 shadow-xl">
                        <figure>
                            <img
                                src={game.background_image}
                                alt={game.name}
                                className="w-full h-64 object-cover"
                            />
                        </figure>
                        <div className="card-body">
                            <p><strong>Released:</strong> {game.released}</p>
                            <p><strong>Rating:</strong> {game.rating}/5</p>
                            <p><strong>Platforms:</strong> {game.platforms?.map(p => p.platform.name).join(', ')}</p>
                        </div>
                    </div>
                    <div className="card mt-6">
                        <Chatbox game={game} />
                    </div>
                </div>
            </div>
        </div>
    );
}