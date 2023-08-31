{#await getPlaylistItems()}
	<p>loading...</p>
{:then playlistItems}
	<PlaylistItems {playlistItems} bind:selectedId />
{:catch error}
	<p>{error.message}</p>
{/await}

<script lang="ts">
	import type { PageData } from './$types'
	import PlaylistItems from '$lib/components/PlaylistItems.svelte'

	export let data: PageData
	$: youtubeApi = data.youtbeApi

	let selectedId = ''

	async function getPlaylistItems() {
		const result = await youtubeApi.playlistItems('PL6t2WAImyGeWGF5vtLv0wvqQUovCa445O')
		selectedId = result.items[0].id
		return result
	}
</script>
