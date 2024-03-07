import { RESTDataSource } from "@apollo/datasource-rest";
import { PlaylistModel, MutationResponse } from "../models"

export class SpotifyAPI extends RESTDataSource {
    baseURL = process.env.SPOTIFY_BASE_URL;

    async getFeaturedPlaylists(): Promise<PlaylistModel[]> {
        const response = await this.get<{
            playlists: {
                items: PlaylistModel[];
            };
        }>("browse/featured-playlists");

        return response?.playlists?.items ?? [];
    }

    getPlaylist(playlistId: string): Promise<PlaylistModel> {
        return this.get(`playlists/${playlistId}`);
    }

    addItemsToPlaylist(input: { playlistId: string, uris: string[] }): Promise<MutationResponse> {
        const { playlistId, uris } = input;
        return this.post(`playlists/${playlistId}/tracks`, {
            params: {
                uris: uris.join(',')
            }
        });
    }
}