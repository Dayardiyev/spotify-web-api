import type {Artist} from "../model/types.ts";

export const durationFormat = (duration_ms: number): string => {
    const totalSeconds = Math.floor(duration_ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}


export const playedAgoFormat = (datetime?: string): string => {
    if (!datetime) return '';

    const date = new Date(datetime);
    const now = new Date();

    const diffMs = now.getTime() - date.getTime();

    if (isNaN(date.getTime()) || diffMs < 0) {
        return "just now";
    }

    const seconds = Math.floor(diffMs / 1000);
    if (seconds < 60) {
        return `${seconds} second${seconds === 1 ? "" : "s"} ago`;
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    }

    const days = Math.floor(hours / 24);
    if (days < 30) {
        return `${days} day${days === 1 ? "" : "s"} ago`;
    }

    const months = Math.floor(days / 30);
    if (months < 12) {
        return `${months} month${months === 1 ? "" : "s"} ago`;
    }

    const years = Math.floor(months / 12);
    return `${years} year${years === 1 ? "" : "s"} ago`;
}

export const getArtistName = (artists: Artist[]): string => {
    return artists.map(artist => artist.name).join(', ');
}

export const releaseDateFormat = (releaseDate: string): string => {
    const date = new Date(releaseDate);

    const parts = new Intl.DateTimeFormat("en-EN", {
        year: "numeric",
        month: "long",
        day: "numeric"
    }).formatToParts(date);

    const year = parts.find(p => p.type === "year")?.value;
    const month = parts.find(p => p.type === "month")?.value;
    const day = parts.find(p => p.type === "day")?.value;

    if (!year || !month || !day) {
        return "";
    }

    return `${year} ${month} ${day}`;
};