import { useContext } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import FavoritesContext from "../context/FavoritesContext";

export default function ToggleFavorite({ game }) {
    const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);

    const isFavorite = favorites?.some(f => f.game_id === game.id);

    return (
        <button
            className={`btn ${isFavorite ? 'btn-error' : 'btn-primary'} btn-sm flex gap-2 items-center`}
            onClick={() => isFavorite ? removeFavorite(game) : addFavorite(game)}
        >
            {isFavorite ? (
                <>
                    <FaHeart className="text-white" />
                    <span>Remove Favorite</span>
                </>
            ) : (
                <>
                    <FaRegHeart />
                    <span>Add Favorite</span>
                </>
            )}
        </button>
    );
}