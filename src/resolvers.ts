import { Resolvers } from './types'
import formatTime from './helpers/formatTime'

export const resolvers: Resolvers = {
    Query: {
        featuredPlaylists: (_, __, { dataSources }) => {
            return dataSources.spotifyAPI.getFeaturedPlaylists();
        },
        playlist: (_, { id }, { dataSources }) => {
            return dataSources.spotifyAPI.getPlaylist(id);
        }
    },
    Mutation: {
        addItemsToPlaylist: async (_, { input }, { dataSources }) => {
            try {
                const response = await dataSources.spotifyAPI.addItemsToPlaylist(input);
                if(response.snapshot_id) {
                    return {
                        code: 200,
                        success: true,
                        message: "Tracks added to playlist!",
                        playlistId: response.snapshot_id,
                    }
                }
                throw Error("snapshot_id property not found");
            } catch(err) {
                return {
                    code: 500,
                    success: false,
                    message: `Something went wrong - ${err}`,
                    playlistId: null,
                };
            }
        }
    },
    Playlist: {
        tracks: ({ tracks }) => {
            const { items = [] } = tracks;
            return items.map(({ track }) => track);
        }
    },
    Track: {
        durationMs: parent => parent.duration_ms,
        durationReadable: parent => {
            let seconds = Math.floor(parent.duration_ms / 1000);
            let minutes = Math.floor(seconds / 60);
            let hours = Math.floor(minutes / 60);
            return `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds, true)}`;
        }
    },
    AddItemsToPlaylistResponse: {
        playlist: ({ playlistId }, _, { dataSources }) => {
            return dataSources.spotifyAPI.getPlaylist(playlistId);
        }
    }
}