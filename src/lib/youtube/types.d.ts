export interface PlaylistItems {
	kind: string
	etag: string
	nextPageToken: string
	items: PlaylistItem[]
	pageInfo: PageInfo
}

export interface PlaylistItem {
	kind: string
	etag: string
	id: string
	snippet: Snippet
}

export interface Snippet {
	publishedAt: Date
	channelId: string
	title: string
	description: string
	thumbnails: Thumbnails
	channelTitle: string
	playlistId: string
	position: number
	resourceId: ResourceID
	videoOwnerChannelTitle: string
	videoOwnerChannelId: string
}

export interface ResourceID {
	kind: string
	videoId: string
}

export interface Thumbnails {
	default: Thumbnail
	medium: Thumbnail
	high: Thumbnail
	standard: Thumbnail
	maxres: Thumbnail
}

export interface Thumbnail {
	url: string
	width: number
	height: number
}

export interface PageInfo {
	totalResults: number
	resultsPerPage: number
}
