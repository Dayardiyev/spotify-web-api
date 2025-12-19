import type {Track} from "../../model/types";
import TracksList from "../../components/TracksList/TracksList";
import { useSpotifyData } from "../../hooks/useSpotifyData";

interface TopTracksResponse {
    items: Track[];
}

export default function TopTracks() {
    const { data, loading, error } = useSpotifyData<TopTracksResponse>('https://api.spotify.com/v1/me/top/tracks');

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading tracks</div>;

    return <TracksList tracks={data?.items || []} />;
}
