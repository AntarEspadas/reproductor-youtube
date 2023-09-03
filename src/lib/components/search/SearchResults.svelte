<ul>
	{#if searchResults?.items}
		{#each searchResults.items as { id, snippet }, index (id)}
			<SearchResultItem id={id.playlistId} {snippet} {index} />
		{/each}
	{/if}
</ul>

<script lang="ts">
	import type { Item, PlaylistSearchResult } from '$lib/youtube/types'
	import SearchResultItem from './SearchResultItem.svelte'

	export let searchResults: PlaylistSearchResult | null
</script>

<style lang="sass">
	ul
		padding: 0
</style>
