import TrackComponent from "../Track/Track.tsx";
import type {Track, RecentTrack} from "../../model/types.ts";

interface TracksListProps {
    tracks: Track[] | RecentTrack[];
    showPlayedAt?: boolean;
}

export default function TracksList({tracks, showPlayedAt = false}: TracksListProps) {
    return (
        <div>
            <ul className="grid gap-5">
                {tracks.map((item) => {
                    if (showPlayedAt) {
                        const recent = item as RecentTrack;
                        return <TrackComponent key={`recent-${recent.track.id}`}
                                               track={recent.track}
                                               played_at={recent.played_at}/>;
                    } else {
                        const track = item as Track;
                        return <TrackComponent key={track.id} track={track}/>;
                    }
                })}
            </ul>
        </div>
    );
}