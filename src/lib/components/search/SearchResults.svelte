<ul>
	{#if playlistItem}
		<SearchResultItem id={playlistItem.id} snippet={playlistItem.snippet} />
	{/if}
	{#if searchResults?.items}
		{#each searchResults.items as { id, snippet } (id)}
			<SearchResultItem id={id.playlistId} {snippet} />
		{/each}
	{/if}
</ul>

<script lang="ts">
	import type { Item, PlaylistSearchResult } from '$lib/youtube/types'
	import SearchResultItem from './SearchResultItem.svelte'

	export let searchResults: PlaylistSearchResult | null
	export let playlistItem: Item | null
</script>
