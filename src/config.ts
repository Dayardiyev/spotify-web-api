export const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
export const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
export const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
export const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
export const SCOPES = [
    'user-library-read',
    'user-read-private',
    'user-top-read',
    'user-read-recently-played'
];

export const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
