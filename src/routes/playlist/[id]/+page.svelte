{#await getPlaylistItems()}
	<p>loading...</p>
{:then [playlistItems, playlistInfo]}
	<TitleBar title={playlistInfo.snippet.title} />
	<PlaylistItemsComponent {playlistItems} bind:selectedId />
	<Controls />
{:catch error}
	<p>{error.message}</p>
{/await}

<script lang="ts">
	import type { PageData } from './$types'
	import PlaylistItemsComponent from '$lib/components/youtube/PlaylistItems.svelte'
	import TitleBar from '$lib/components/TitleBar.svelte'
	import Controls from '$lib/components/Controls.svelte'
	import type { Item, PlaylistItems } from '$lib/youtube/types'

	export let data: PageData
	$: youtubeApi = data.youtbeApi

	let selectedId = ''

	async function getPlaylistItems(): Promise<[PlaylistItems, Item]> {
		const promises = [
			youtubeApi.playlistItems(data.playlistId),
			youtubeApi.playlistInfo(data.playlistId)
		]
		const [items, info] = await Promise.all(promises)
		selectedId = items.items[0].id
		return [items, info.items[0]]
	}
</script>
