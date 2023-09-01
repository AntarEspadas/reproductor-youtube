<div
	style="--padding: {startEndMargin}px; --margin: {margin}px; --width: {width}px; --scale: {scale};"
	class="playlist-item"
	class:selected
	role="button"
	tabindex={index}
	on:click={handleClick}
	on:keypress={(e) => e.key === 'Enter' && handleClick()}
	bind:this={div}
>
	<!-- <h1>{item.snippet.title}</h1> -->
	<div class="image" style="background-image: url({url});">
		{#if iframeVisible}
			<YoutubePlayer
				videoId={item.snippet.resourceId.videoId}
				{index}
				on:stateChange={handleStateChange}
			/>
		{/if}
	</div>
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
		scale = Math.max(scale, 0.25)
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
		.image
			width: var(--width)
			aspect-ratio: 16/9
			background-color: red
			background-position: center
			background-size: cover
			display: flex
			align-items: center
			justify-content: center

	.playlist-item:first-of-type
		margin-left: var(--padding)

	.playlist-item:last-of-type
		margin-right: var(--padding)
</style>
