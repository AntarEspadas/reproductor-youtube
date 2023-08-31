import type { PlaylistItems } from './types'

export class YoutubeApi {
	constructor(private apiKey: string) {}

	public async playlistItems(playlistId: string, maxResults = 50) {
		const part = 'snippet'
		const response = await fetch(
			`https://www.googleapis.com/youtube/v3/playlistItems?key=${this.apiKey}&part=${part}&playlistId=${playlistId}&maxResults=${maxResults}`
		)
		return (await response.json()) as PlaylistItems
	}
}
