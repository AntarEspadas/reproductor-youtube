<SearchBar on:search={(e) => goto(`/?q=${e.detail.query}`)} />
{#if promise}
	{#await promise}
		<p>loading...</p>
	{:then [playlistItems, playlistInfo]}
		<TitleBar title={playlistInfo.snippet.title} />
		<PlaylistPlayer {playlistItems} />
	{:catch error}
		<p>{error.message}</p>
	{/await}
{/if}

<script lang="ts">
	import type { PageData } from './$types'
	import TitleBar from '$lib/components/TitleBar.svelte'
	import PlaylistPlayer from '$lib/components/player/PlaylistPlayer.svelte'
	import SearchBar from '$lib/components/search/SearchBar.svelte'
	import type { Item, PlaylistItems } from '$lib/youtube/types'
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'

	export let data: PageData

	let promise: Promise<[PlaylistItems, Item]>
	let mounted = false

	$: youtubeApi = data.youtubeApi
	$: if (data.playlistId !== '' && mounted) {
		promise = getPlaylistItems(data.playlistId)
	}

	onMount(() => {
		mounted = true
	})

	async function getPlaylistItems(playlistId: string): Promise<[PlaylistItems, Item]> {
		const promises = [youtubeApi.playlistItems(playlistId), youtubeApi.playlistInfo(playlistId)]
		const [items, info] = await Promise.all(promises)
		return [items, info.items[0]]
	}
</script>
