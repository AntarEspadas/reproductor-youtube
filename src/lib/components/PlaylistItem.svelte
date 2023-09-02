<div
	style="--padding: {startEndMargin}px; --margin: {margin}px; --width: {width}px; --scale: {scale}; --url: url({url});"
	class="playlist-item"
	class:selected
	role="button"
	tabindex={index}
	on:click={handleClick}
	on:keypress={(e) => e.key === 'Enter' && handleClick()}
	bind:this={div}
>
	{#if iframeVisible}
		<YoutubePlayer
			videoId={item.snippet.resourceId.videoId}
			{index}
			on:stateChange={handleStateChange}
		/>
	{/if}
	{#if !selected}
		<div class="overlay">
			<span class="material-symbols-outlined"> play_arrow </span>
		</div>
	{/if}
</div>

<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte'
	import type { PlaylistItem } from '$lib/youtube/types'
	import YoutubePlayer from './YoutubePlayer.svelte'

	export let item: PlaylistItem
	export let selected: boolean
	// export let scroll: number
	export let index: number
	export let parentWidth: number
	export let margin = 0
	export let width = 600

	let scale = 1
	let iframeVisible = false

	let div: HTMLDivElement | null = null

	$: thumbnails = item.snippet.thumbnails
	$: url =
		thumbnails.maxres?.url ??
		thumbnails.high?.url ??
		thumbnails.medium?.url ??
		thumbnails.default?.url ??
		''
	// $: scale = getScale(index, scroll)
	$: startEndMargin = parentWidth / 2 - width / 2

	$: if (selected) {
		setTimeout(() => {
			// Si el item fue deseleccionado antes de que
			// el timeout terminara, no mostrar el iframe
			if (selected) iframeVisible = true
		}, 400)
	} else {
		iframeVisible = false
	}

	const dispatch = createEventDispatcher<{
		click: { item: PlaylistItem; scroll: number }
		stateChange: { index: number; videoId: string; state: YT.PlayerState; scroll: number }
	}>()

	onMount(() => {
		div?.parentElement?.addEventListener('scroll', handleScroll)
		const scroll = div?.parentElement?.scrollLeft ?? 0
		scale = getScale(index, scroll)
	})

	function handleScroll() {
		const scroll = div?.parentElement?.scrollLeft ?? 0
		scale = getScale(index, scroll)
	}

	function getScale(index: number, scroll: number) {
		const distance = index * (width + margin) - scroll
		let scale = 1.2 - Math.abs(distance) / width
		scale = Math.max(scale, 0.35)
		return scale
	}
	function handleClick() {
		const scroll = getScroll()
		dispatch('click', { item, scroll })
	}

	function handleStateChange(
		e: CustomEvent<{ index: number; state: YT.PlayerState; videoId: string }>
	) {
		dispatch('stateChange', { ...e.detail, scroll: getScroll() })
	}

	function getScroll() {
		return index * (width + margin)
	}
</script>

<style lang="sass">
	.playlist-item
		scroll-snap-align: center
		margin-right: var(--margin)
		animation: shrink 0.2s ease-in-out
		scale: var(--scale)
		background-color: red
		flex-shrink: 0
		width: var(--width)
		aspect-ratio: 16/9
		background-position: center
		background-size: cover
		display: flex
		align-items: center
		justify-content: center
		background-image: var(--url)

	.playlist-item:hover
		cursor: pointer

	.playlist-item:first-of-type
		margin-left: var(--padding)

	.playlist-item:last-of-type
		margin-right: var(--padding)

	.overlay
		position: absolute
		top: 0
		left: 0
		width: 100%
		height: 100%
		display: flex
		align-items: center
		justify-content: center
		background-color: rgba(0, 0, 0)
		opacity: 0.5
		transition: opacity 0.2s ease-in-out
		color: white

		span
			font-size: 7rem

	.playlist-item:not(:hover) .overlay
		opacity: 0
		transition: opacity 0.5s ease-in-out
</style>
