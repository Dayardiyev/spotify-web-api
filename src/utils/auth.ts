import {AUTH_ENDPOINT, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, SCOPES, TOKEN_ENDPOINT} from "../config";

interface TokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
}

export const getAuthUrl = () => {
    const params = new URLSearchParams({
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        scope: SCOPES.join(' '),
        response_type: 'code',
        state: 'mykey'
    });
    return `${AUTH_ENDPOINT}?${params.toString()}`;
};

export const getToken = async (code: string): Promise<TokenResponse> => {
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", REDIRECT_URI);
    params.append("client_id", CLIENT_ID);
    params.append("client_secret", CLIENT_SECRET);

    try {
        const response = await fetch(TOKEN_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error_description || "Failed to get token");
        }


        return await response.json();
    } catch (error) {
        console.error("Error getting token:", error);
        throw error;
    }
};

export const saveToken = (tokenData: TokenResponse) => {
    localStorage.setItem('spotify_access_token', tokenData.access_token);
    if (tokenData.refresh_token) {
        localStorage.setItem('spotify_refresh_token', tokenData.refresh_token);
    }
};

export const getAccessToken = () => {
    return localStorage.getItem('spotify_access_token');
};

export const removeToken = () => {
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_refresh_token');
};
