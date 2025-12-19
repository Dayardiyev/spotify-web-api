import type {Artist, Track as TrackType} from '../../model/types';
import {useCallback} from "react";
import {dateFormat} from "../../utils/utils.ts";

type TrackProps = {
    "track": TrackType,
    played_at?: string
}

export default function Track({track, played_at}: TrackProps) {
    const {name, artists, album} = track;

    const getArtistName = useCallback((artists: Artist[]) => (
        artists.map(artist => artist.name)
    ), [])

    return (
        <li>
            <article className='px-5 py-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                <p>{album.name} ({album.release_date.substring(0, 4)})</p>
                <h3 className='text-2xl'>{getArtistName(artists)} — {name}</h3>
                <p>{dateFormat(played_at)}</p>
            </article>
        </li>
    )
}
