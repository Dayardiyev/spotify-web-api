import type {RecentTrack} from "../../model/types";
import TracksList from "../../components/TracksList/TracksList";
import { useSpotifyData } from "../../hooks/useSpotifyData";

interface RecentTracksResponse {
    items: RecentTrack[];
}

export default function RecentTracks() {
    const { data, loading, error } = useSpotifyData<RecentTracksResponse>('https://api.spotify.com/v1/me/player/recently-played');

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading tracks</div>;

    return <TracksList tracks={data?.items || []} showPlayedAt />;
}
