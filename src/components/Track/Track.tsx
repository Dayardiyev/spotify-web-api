import type {Artist, Track as TrackType} from '../../model/types';
import {useCallback, useState} from "react";
import {dateFormat} from "../../utils/utils.ts";
import {ImageModal} from '../ImageModal/ImageModal';

type TrackProps = {
    "track": TrackType,
    played_at?: string
}

export default function Track({track, played_at}: TrackProps) {
    const {name, artists, album} = track;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getArtistName = useCallback((artists: Artist[]) => (
        artists.map(artist => artist.name).join(', ')
    ), [])

    const handleImageClick = useCallback(() => {
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
            <article className='px-5 py-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex gap-5'>
                <div>
                    <img 
                        src={album.images[1]?.url || album.images[0]?.url} 
                        className='h-30 cursor-pointer hover:opacity-80 transition-opacity duration-200' 
                        alt={album.name}
                        onClick={handleImageClick}
                    />
                </div>
                <div>
                    <p>{album.name} ({album.release_date.substring(0, 4)})</p>
                    <h3 className='text-2xl'>{getArtistName(artists)} — {name}</h3>
                    <p>{dateFormat(played_at)}</p>
                </div>
            </article>
            
            <ImageModal
                isOpen={isModalOpen}
                imageSrc={album.images[0]?.url || album.images[1].url}
                imageAlt={`${album.name} album cover`}
                onClose={handleCloseModal}
            />
        </li>
    )
}
