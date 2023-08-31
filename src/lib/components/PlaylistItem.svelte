<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	style="--padding: {startEndMargin}px; --margin: {margin}px; --width: {width}px; --scale: {scale};"
	class="playlist-item"
	class:selected
	on:click={handleClick}
	bind:this={div}
>
	<!-- <h1>{item.snippet.title}</h1> -->
	<div class="image" style="background-image: url({url});">
		{#if iframeVisible}
			<iframe
				width="100%"
				height="100%"
				src="https://www.youtube-nocookie.com/embed/{item.snippet.resourceId
					.videoId}?amp;controls=1&autoplay=1"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen
				style="opacity: {$opacity};"
			/>
		{/if}
	</div>
</div>

<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte'
	import { tweened } from 'svelte/motion'
	import { cubicOut } from 'svelte/easing'
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

	const opacity = tweened(0, {
		duration: 1000,
		easing: cubicOut
	})

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
		setTimeout(() => {
			opacity.set(1)
		}, 1000)
	} else {
		iframeVisible = false
		opacity.set(0)
	}

	const dispatch = createEventDispatcher<{
		click: { item: PlaylistItem; scroll: number }
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
		const scroll = index * (width + margin)
		dispatch('click', { item, scroll })
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
