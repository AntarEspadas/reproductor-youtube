<div class="main">
	<div class="search-container" class:large={data.query === ''}>
		<div class="search">
			<SearchBar query={decodeURIComponent(data.query)} on:search={handleSearch} />
		</div>
	</div>
	{#if promise}
		<div class="results" transition:fade>
			{#await promise}
				<div class="loading-container">
					<Loading size="1.5rem" />
				</div>
			{:then searchResults}
				{#if searchResults.items.length > 0}
					<SearchResults {searchResults} />
				{:else}
					<NoResults />
				{/if}
			{:catch error}
				Se produjo un error
			{/await}
		</div>
	{:else if mounted}
		<h1 in:fade={{ delay: 200, duration: 500 }} out:fade={{ duration: 100 }} class="texto-ayuda">
			Haga una búsqueda o introduzca el ID de una playlist
		</h1>
	{/if}
</div>

<script lang="ts">
	import type { PageData } from './$types'
	import SearchBar from '$lib/components/search/SearchBar.svelte'
	import SearchResults from '$lib/components/search/SearchResults.svelte'
	import Loading from '$lib/components/Loading.svelte'
	import NoResults from '$lib/components/search/NoResults.svelte'
	import type { Item, PlaylistSearchResult } from '$lib/youtube/types'
	import { fade } from 'svelte/transition'
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import { base } from '$app/paths'

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
			goto(`${base}/playlist?id=${playlistInfo.items[0].id}`, { replaceState: true })
		}
	}

	async function handleSearch(e: CustomEvent<{ query: string }>) {
		goto(`${base}/?q=${e.detail.query}`)
	}
</script>

<style lang="sass">
	.loading-container
		position: absolute
		top: 50%
		left: 50%
		transform: translate(-50%, -50%)

	.search-container
		position: absolute
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

	.texto-ayuda
		text-align: center
		margin-top: 7rem
		font-weight: 300
		letter-spacing: 0.1rem
		line-height: 1.5
		transition: opacity 0.2s ease-in-out
</style>
