import { useState } from "react";
import { useNavigate } from "react-router";

export default function Searchbar() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [ariaInvalid, setAriaInvalid] = useState(null);

    const handleSearch = (event) => {
        event.preventDefault();
        if (typeof search === 'string' && search.trim().length !== 0) {
            navigate(`/search?query=${encodeURIComponent(search)}`);
            setSearch("");
            setAriaInvalid(false);
        } else {
            setAriaInvalid(true);
        }
    };

    return (
        <form onSubmit={handleSearch} className="flex gap-2">
            <input
                type="text"
                name="search"
                placeholder={ariaInvalid ? "Devi cercare qualcosa" : "Search a game"}
                className={`input input-bordered ${ariaInvalid ? 'input-error' : ''}`}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-invalid={ariaInvalid}
            />
            <button type="submit" className="btn btn-primary">
                Go
            </button>
        </form>
    );
}