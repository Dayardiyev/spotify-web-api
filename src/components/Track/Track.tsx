import type {Track as TrackType} from '../../model/types';
import {useCallback, useState} from "react";
import {playedAgoFormat, getArtistName} from "../../utils/utils.ts";
import {TrackDetailsModal} from '../TrackDetailsModal/TrackDetailsModal.tsx';

type TrackProps = {
    "track": TrackType,
    played_at?: string
}

export default function Track({track, played_at}: TrackProps) {
    const {name, artists, album} = track;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleTrackClick = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    if (!album || !album.images || album.images.length === 0) {
        return null;
    }

    return (
        <li>
            <article className='px-5 py-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex gap-5 cursor-pointer'
                     onClick={handleTrackClick}>
                <div>
                    <img
                        src={album.images[1]?.url || album.images[0]?.url}
                        className='h-30 transition-opacity'
                        alt={album.name}
                    />
                </div>
                <div>
                    <p>{album.name} ({album.release_date.substring(0, 4)})</p>
                    <h3 className='text-2xl'>{getArtistName(artists)} — {name}</h3>
                    <p>{playedAgoFormat(played_at)}</p>
                </div>
            </article>

            <TrackDetailsModal
                isOpen={isModalOpen}
                track={track}
                onClose={handleCloseModal}
            />
        </li>
    )
}
