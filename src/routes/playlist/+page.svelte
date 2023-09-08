<div class="background" style="--background-image: url('{$currentThumbnail}')" />
<SearchBar on:search={(e) => goto(`${base}/?q=${e.detail.query}`)} />
{#if promise}
	{#await promise}
		<div class="loading-container">
			<Loading size="1.5rem" />
		</div>
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
	import Loading from '$lib/components/Loading.svelte'
	import type { Item, PlaylistItems } from '$lib/youtube/types'
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import { base } from '$app/paths'
	import { currentThumbnail } from '$lib/stores'

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

<style lang="sass">
	.background
		position: fixed
		top: 0
		left: 0
		width: 100%
		height: 100%
		background-image: var(--background-image)
		background-size: cover
		transform: scale(1.2)
		filter: blur(100px)
		-webkit-mask-image: linear-gradient(to top, transparent, black)
		mask-image: linear-gradient(to top, transparent, black)
		z-index: -1
		transition: background-image 1s ease-in-out
	.loading-container
		position: absolute
		top: 50%
		left: 50%
		transform: translate(-50%, -50%)
</style>
