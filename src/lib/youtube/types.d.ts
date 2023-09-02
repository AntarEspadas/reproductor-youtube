export interface PlaylistItems {
	kind: string
	etag: string
	nextPageToken: string
	items: Item[]
	pageInfo: PageInfo
}

export interface Item<Tid = string> {
	kind: string
	etag: string
	id: Tid
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
	standard?: Thumbnail
	maxres?: Thumbnail
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

export interface PlaylistInfo {
	kind: string
	etag: string
	pageInfo: PageInfo
	items: Item[]
}

export interface Snippet {
	publishedAt: Date
	channelId: string
	title: string
	description: string
	thumbnails: Thumbnails
	channelTitle: string
	localized: Localized
}

export interface Localized {
	title: string
	description: string
}

export interface PlaylistSearchResult {
	kind: string
	etag: string
	nextPageToken: string
	regionCode: string
	pageInfo: PageInfo
	items: Item<PlaylistID>[]
}

export interface PlaylistID {
	kind: string
	playlistId: string
}
