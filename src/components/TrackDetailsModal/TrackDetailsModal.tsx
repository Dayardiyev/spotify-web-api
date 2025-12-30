import {useEffect} from 'react';
import {createPortal} from 'react-dom';
import type {Track} from "../../model/types.ts";
import {durationFormat, getArtistName, releaseDateFormat} from "../../utils/utils.ts";

interface TrackDetailsModal {
    isOpen: boolean;
    track: Track
    onClose: () => void;
}

export function TrackDetailsModal({isOpen, track, onClose}: TrackDetailsModal) {
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscKey);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const {album, artists, name, duration_ms} = track;

    const modalContent = (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ease-out"
                onClick={onClose}
            />

            <div
                className="relative z-10 max-w-4xl max-h-full animate-in zoom-in-95 fade-in duration-300 ease-out bg-white p-7">
                <img
                    src={album.images[1].url}
                    alt={album.name + ' cover'}
                    className="w-full max-h-[90vh] object-contain mb-3"
                />

                <div>
                    <p>{album.name} – {releaseDateFormat(album.release_date)}</p>
                    <h3 className='text-2xl'>{getArtistName(artists)} — {name}</h3>
                    <p>Duration: {durationFormat(duration_ms)}</p>
                    <a href={track.external_urls.spotify}
                       target="_blank"
                       className='float-end bg-black p-2 text-white cursor-pointer flex items-center gap-2 w-40'
                    >
                        <span className="text-nowrap">Open in spotify</span>
                        <svg viewBox="0 0 24 24">
                            <g>
                                <path fill="black" d="M0 0h24v24H0z"/>
                                <path fill="white"
                                      d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.55 2 12 2zm3.75 14.65c-2.35-1.45-5.3-1.75-8.8-.95-.35.1-.65-.15-.75-.45-.1-.35.15-.65.45-.75 3.8-.85 7.1-.5 9.7 1.1.35.15.4.55.25.85-.2.3-.55.4-.85.2zm1-2.7c-2.7-1.65-6.8-2.15-9.95-1.15-.4.1-.85-.1-.95-.5-.1-.4.1-.85.5-.95 3.65-1.1 8.15-.55 11.25 1.35.3.15.45.65.2 1s-.7.5-1.05.25zM6.3 9.75c-.5.15-1-.15-1.15-.6-.15-.5.15-1 .6-1.15 3.55-1.05 9.4-.85 13.1 1.35.45.25.6.85.35 1.3-.25.35-.85.5-1.3.25C14.7 9 9.35 8.8 6.3 9.75z"/>
                            </g>
                        </svg>
                    </a>
                </div>

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-200"
                    aria-label="Close modal"
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}