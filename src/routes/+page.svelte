<div class="main">
	<SearchBar bind:query on:search={handleSearch} />
	<SearchResults {searchResults} {playlistItem} />
</div>

<script lang="ts">
	import type { PageData } from './$types'
	import SearchBar from '$lib/components/search/SearchBar.svelte'
	import SearchResults from '$lib/components/search/SearchResults.svelte'
	import type { Item, PlaylistSearchResult } from '$lib/youtube/types'
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'

	export let data: PageData

	let query = data.query
	let searchResults: PlaylistSearchResult | null = null
	let playlistItem: Item | null = null

	$: youtubeApi = data.youtubeApi

	onMount(() => {
		if (query !== '') {
			search(query)
		}
	})

	async function search(query: string) {
		if (query === '') {
			searchResults = null
			return
		}
		searchResults = await youtubeApi.searchPlaylists(query)
		const playlistInfo = await youtubeApi.playlistInfo(query)
		if (playlistInfo.items?.at(0)?.id !== undefined) {
			goto(`/playlist/${playlistInfo.items[0].id}`, { replaceState: true })
		}
	}

	async function handleSearch() {
		goto(`/?q=${query}`)
		search(query)
	}
</script>
