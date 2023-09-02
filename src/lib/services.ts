import { PUBLIC_API_KEY } from '$env/static/public'
import { YoutubeApi } from './youtube'

export const youtubeApi = new YoutubeApi(
	PUBLIC_API_KEY ?? 'AIzaSyAIZwAHLNWlbfGnZskOAt9zquOJw68yORs'
)
