import type { PageLoad } from './$types'
import { youtubeApi } from '$lib/services'

export const load: PageLoad = ({ params }) => {
	return Promise.resolve({
		youtubeApi,
		playlistId: params.id
	})
}
