import { useState, useEffect, useContext, useCallback } from "react";
import supabase from "../supabase/supabase-client";
import SessionContext from "./SessionContext";
import FavoritesContext from "./FavoritesContext";

export default function FavoritesProvider({ children }) {
    const { session } = useContext(SessionContext);
    const [favorites, setFavorites] = useState([]);

    const getFavorites = useCallback(async () => {
        if (!session?.user?.id) return;

        let { data: favourites, error } = await supabase
            .from("favorites")
            .select("*")
            .eq("user_id", session.user.id);

        if (error) {
            console.error("Error fetching favorites:", error);
        } else {
            setFavorites(favourites || []);
        }
    }, [session]);

    const addFavorite = async (game) => {
        if (!session?.user?.id) return;

        const { data, error } = await supabase
            .from("favorites")
            .insert([{
                user_id: session.user.id,
                game_id: game.id,
                game_name: game.name,
                game_image: game.background_image
            }])
            .select();

        if (error) {
            console.error("Error adding favorite:", error);
        } else {
            setFavorites(prev => [...prev, ...data]);
        }
    };

    const removeFavorite = async (game) => {
        if (!session?.user?.id) return;
        
        console.log("Removing favorite:", game);
        
        const gameIdToDelete = game.game_id ? game.game_id : game.id;
        
        const { error } = await supabase
            .from("favorites")
            .delete()
            .eq("game_id", gameIdToDelete)
            .eq("user_id", session.user.id);

        if (error) {
            console.error("Error removing favorite:", error);
        } else {
            setFavorites(prev => prev.filter(f => f.game_id !== gameIdToDelete));
        }
    };

    useEffect(() => {
        if (session) {
            getFavorites();

            const channel = supabase
                .channel("favorites_changes")
                .on(
                    "postgres_changes",
                    {
                        event: "*",
                        schema: "public",
                        table: "favorites",
                        filter: `user_id=eq.${session.user.id}`
                    },
                    () => getFavorites()
                )
                .subscribe();

            return () => {
                supabase.removeChannel(channel);
            };
        }
    }, [getFavorites, session]);

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                addFavorite,
                removeFavorite
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}