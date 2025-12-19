import {getAccessToken, removeToken} from "./auth";

export const fetchSpotifyApi = async (endpoint: string) => {
    const token = getAccessToken();

    if (!token) {
        throw new Error("No access token");
    }

    const response = await fetch(endpoint, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (response.status === 401) {
        removeToken();
        window.location.href = '/';
        throw new Error("Session expired");
    }

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "API Error");
    }

    return response.json();
};
