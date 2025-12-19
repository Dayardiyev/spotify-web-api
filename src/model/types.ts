export interface Image {
    url: string,
    height: number,
    width: number
}

export interface Artist {
    "href": string,
    "id": string,
    "name": string,
    "type": string,
    "uri": string,
    "external_urls": {
        "spotify": string
    },
}

export interface Album {
    "album_type": string,
    "total_tracks": number,
    "external_urls": {
        "spotify": string
    },
    "available_markets": string[]
    "href": string,
    "id": string,
    "type": string,
    "images": Image[],
    "name": string,
    "release_date": string,
    "release_date_precision": string,
    "uri": string,
    "artists": Artist[],
    "is_playable"?: boolean
}

export interface Track {
    "album": Album,
    "artists": Artist[],
    "duration_ms": number,
    "explicit": boolean,
    "external_urls": {
        "spotify": string
    },
    "available_markets": string[],
    "disc_number": number,
    "external_ids": {
        "isrc": string
    }
    "href": string,
    "id": string,
    "is_playable"?: boolean,
    "name": string,
    "popularity": number,
    "preview_url": string | null,
    "track_number": number,
    "type": string,
    "uri": string,
    "is_local": boolean
}

export interface RecentTrack {
    "track": Track,
    "played_at": string,
    "context": null | object
}