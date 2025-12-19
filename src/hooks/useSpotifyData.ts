import { useEffect, useState } from "react";
import { fetchSpotifyApi } from "../utils/api";

export function useSpotifyData<T>(endpoint: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;
        
        fetchSpotifyApi(endpoint)
            .then(result => {
                if (isMounted) {
                    setData(result);
                    setLoading(false);
                }
            })
            .catch(err => {
                if (isMounted) {
                    setError(err);
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [endpoint]);

    return { data, loading, error };
}
