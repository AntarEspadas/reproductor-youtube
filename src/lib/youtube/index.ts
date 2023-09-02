import type { PlaylistItems, PlaylistSearchResult } from './types'

export class YoutubeApi {
	constructor(private apiKey: string) {}

	public async playlistItems(playlistId: string, maxResults = 50) {
		const part = 'snippet'
		const response = await fetch(
			`https://www.googleapis.com/youtube/v3/playlistItems?key=${this.apiKey}&part=${part}&playlistId=${playlistId}&maxResults=${maxResults}`
		)
		return (await response.json()) as PlaylistItems
	}

	public async playlistInfo(playlistId: string) {
		const part = 'snippet'
		const response = await fetch(
			`https://www.googleapis.com/youtube/v3/playlists?key=${this.apiKey}&part=${part}&id=${playlistId}`
		)
		return (await response.json()) as PlaylistItems
	}

	public async searchPlaylists(query: string, maxResults = 50) {
		const part = 'snippet'
		const type = 'playlist'
		const escapedQuery = encodeURIComponent(query)
		const response = await fetch(
			`https://www.googleapis.com/youtube/v3/search?key=${this.apiKey}&part=${part}&q=${escapedQuery}&type=${type}&maxResults=${maxResults}`
		)
		return (await response.json()) as PlaylistSearchResult
	}
}
