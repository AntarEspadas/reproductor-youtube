import type { PageLoad } from './$types'
import { youtubeApi } from '$lib/services'
import { browser } from '$app/environment'

export const load: PageLoad = ({ url }) => {
	let query = ''
	if (browser) query = url.searchParams.get('q') ?? ''
	return Promise.resolve({
		youtubeApi,
		query
	})
}
