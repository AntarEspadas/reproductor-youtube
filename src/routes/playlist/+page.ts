import type { PageLoad } from './$types'
import { youtubeApi } from '$lib/services'
import { browser } from '$app/environment'

export const load: PageLoad = ({ url }) => {
	let playlistId = ''
	if (browser) playlistId = url.searchParams.get('id') ?? ''
	return Promise.resolve({
		youtubeApi,
		playlistId
	})
}
