import type { PageLoad } from './$types'
import { YoutubeApi } from '$lib/youtube'

export const load: PageLoad = () => {
	return Promise.resolve({
		youtbeApi: new YoutubeApi('AIzaSyAIZwAHLNWlbfGnZskOAt9zquOJw68yORs')
	})
}