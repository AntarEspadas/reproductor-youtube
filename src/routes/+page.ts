import type { PageLoad } from './$types'
import { youtubeApi } from '$lib/services'

export const load: PageLoad = ({ url }) => {
	const query = url.searchParams.get('q') ?? ''
	return Promise.resolve({
		youtubeApi,
		query
	})
}
