import * as env from '$env/static/public'
import { YoutubeApi } from './youtube'

export const youtubeApi = new YoutubeApi(
	env.PUBLIC_API_KEY ?? 'AIzaSyAIZwAHLNWlbfGnZskOAt9zquOJw68yORs'
)
