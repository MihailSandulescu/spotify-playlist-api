// Represents a playlist object returned by the REST API
export type PlaylistModel = {
    id: string;
    name: string;
    description: string;
    tracks: {
        items: {
            track: TrackModel;
        }[];
    };
};

export type TrackModel = {
    id: string;
    name: string;
    uri: string;
    explicit: boolean;
    duration_ms: number;
};

export type MutationResponse = {
    snapshot_id?: string;
    error?: string;
}

export type AddItemsToPlaylistResponseModel = {
    code: number;
    success: boolean;
    message: string;
    playlistId: string;
}