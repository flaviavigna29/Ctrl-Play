import { useState, useEffect, useCallback } from 'react';

export default function useFetchSolution(initialUrl) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [url, updateUrl] = useState(initialUrl);

    const load = useCallback(async () => {
        setData(null);
        if (!url) {
            setError("Error URL");
            return;
        }
        
        setError(null);
        setLoading(true);
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const json = await response.json();
            setData(json);
        } catch (error) {
            setError(error.message);
            setData(null);
        } finally {
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        if (initialUrl) load();
    }, [load, initialUrl]);

    return {
        url,
        loading,
        error,
        data,
        load,
        updateUrl
    };
}