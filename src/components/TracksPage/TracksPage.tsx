import type { Track, RecentTrack } from "../../model/types";
import TracksList from "../TracksList/TracksList";
import { useSpotifyData } from "../../hooks/useSpotifyData";

interface RecentTracksResponse {
    items: RecentTrack[];
}

interface TopTracksResponse {
    items: Track[];
}

interface TracksPageProps {
    endpoint: string;
    showPlayedAt?: boolean;
    title?: string;
}

export default function TracksPage({ endpoint, showPlayedAt = false, title }: TracksPageProps) {
    const { data, loading, error } = useSpotifyData<RecentTracksResponse | TopTracksResponse>(endpoint);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading tracks</div>;

    return (
        <div>
            {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
            <TracksList tracks={data?.items || []} showPlayedAt={showPlayedAt} />
        </div>
    );
}