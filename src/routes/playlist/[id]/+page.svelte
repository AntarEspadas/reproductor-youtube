{#await getPlaylistItems()}
	<p>loading...</p>
{:then [playlistItems, playlistInfo]}
	<TitleBar title={playlistInfo.snippet.title} />
	<PlaylistPlayer {playlistItems} />
{:catch error}
	<p>{error.message}</p>
{/await}

<script lang="ts">
	import type { PageData } from './$types'
	import TitleBar from '$lib/components/TitleBar.svelte'
	import PlaylistPlayer from '$lib/components/youtube/PlaylistPlayer.svelte'
	import type { Item, PlaylistItems } from '$lib/youtube/types'

	export let data: PageData
	$: youtubeApi = data.youtbeApi

	async function getPlaylistItems(): Promise<[PlaylistItems, Item]> {
		const promises = [
			youtubeApi.playlistItems(data.playlistId),
			youtubeApi.playlistInfo(data.playlistId)
		]
		const [items, info] = await Promise.all(promises)
		return [items, info.items[0]]
	}
</script>
