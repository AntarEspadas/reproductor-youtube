<div class="main">
	<div class="search-container" class:large={data.query === ''}>
		<div class="search">
			<SearchBar query={decodeURIComponent(data.query)} on:search={handleSearch} />
		</div>
	</div>
	<div class="results">
		{#if promise}
			{#await promise}
				<p>loading...</p>
			{:then searchResults}
				<SearchResults {searchResults} />
			{:catch error}
				Se produjo un error
			{/await}
		{/if}
	</div>
</div>

<script lang="ts">
	import type { PageData } from './$types'
	import SearchBar from '$lib/components/search/SearchBar.svelte'
	import SearchResults from '$lib/components/search/SearchResults.svelte'
	import type { Item, PlaylistSearchResult } from '$lib/youtube/types'
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'

	export let data: PageData

	let promise: Promise<PlaylistSearchResult> | null = null
	let mounted = false

	$: youtubeApi = data.youtubeApi
	$: if (mounted) {
		search(data.query)
	}

	onMount(() => {
		mounted = true
	})

	async function search(query: string) {
		if (query === '') {
			promise = null
			return
		}
		promise = youtubeApi.searchPlaylists(query)
		const playlistInfo = await youtubeApi.playlistInfo(query)
		if (playlistInfo.items?.at(0)?.id !== undefined) {
			goto(`/playlist/${playlistInfo.items[0].id}`, { replaceState: true })
		}
	}

	async function handleSearch(e: CustomEvent<{ query: string }>) {
		goto(`/?q=${e.detail.query}`)
	}
</script>

<style lang="sass">
	.search-container
		position: fixed
		top: 0
		left: 50%
		transition-property: top, transform
		transition-duration: 0.4s
		transition-timing-function: ease-in-out
		transform: translateX(-50%)

		.search
			transition: transform 0.4s ease-in-out

		&.large
			top: 50%
			transform: translate(-50%, -50%)

			.search
				transform: scale(1.5) translate(0, -50%)

	.results
		margin-top: 7rem
</style>
