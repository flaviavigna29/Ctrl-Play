import { Link } from 'react-router';
import LazyLoadGameImage from "./LazyLoadGameImage";

export default function CardGame({ game }) {
    const genres = game.genres?.map((genre) => genre.name).join(", ") || "No genres";

    return (
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
            <figure>
                <LazyLoadGameImage image={game.background_image} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{game.name}</h2>
                <p className="text-sm text-gray-500">{genres}</p>
                <p className="text-sm">Released: {game.released}</p>
                <div className="card-actions justify-end mt-2">
                    <Link
                        to={`/games/${game.slug}/${game.id}`}
                        className="btn btn-neutral btn-xs"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>

    );
}