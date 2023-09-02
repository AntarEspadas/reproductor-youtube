import type { PageLoad } from './$types'
import { YoutubeApi } from '$lib/youtube'

export const load: PageLoad = ({ url }) => {
	const query = url.searchParams.get('q') ?? ''
	return Promise.resolve({
		youtbeApi: new YoutubeApi('AIzaSyAFz27nx2r3vK09bOBkQi4LZKquWSkoBPU'),
		query
	})
}
