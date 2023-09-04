import type { PageLoad } from './$types'
import { youtubeApi } from '$lib/services'

export const load: PageLoad = ({ url }) => {
	const params = url.searchParams
	const playlistId = params.get('id') ?? ''
	return Promise.resolve({
		youtubeApi,
		playlistId
	})
}
