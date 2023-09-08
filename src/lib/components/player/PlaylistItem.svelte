<div
	style="--padding: {startEndMargin}px; --margin: {margin}px; --width: {width}px; --scale: {scale}; --url: url({url});"
	class="playlist-item border-radius"
	class:selected
	role="button"
	tabindex={index}
	on:click={handleClick}
	on:keypress={(e) => e.key === 'Enter' && handleClick()}
	bind:this={div}
>
	<div class="title-overlay">
		<h3>{item.snippet.title}</h3>
	</div>
	{#if iframeVisible}
		<YoutubePlayer videoId={item.snippet.resourceId.videoId} {index} />
	{:else}
		<div class="overlay border-radius" out:fade>
			<span class="material-symbols-outlined"> play_arrow </span>
			<p class="title">{item.snippet.title}</p>
		</div>
	{/if}
</div>

<script lang="ts">
	import { fade } from 'svelte/transition'
	import { createEventDispatcher, onMount } from 'svelte'
	import type { Item } from '$lib/youtube/types'
	import YoutubePlayer from './YoutubePlayer.svelte'
	import { currentThumbnail } from '$lib/stores'

	export let item: Item
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

		$currentThumbnail = url
	} else {
		iframeVisible = false
	}

	const dispatch = createEventDispatcher<{
		click: { item: Item; scroll: number; index: number }
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
		dispatch('click', { item, scroll, index })
	}

	function getScroll() {
		return index * (width + margin)
	}
</script>

<style lang="sass">
	.playlist-item
		scroll-snap-align: center
		scroll-snap-stop: always
		margin-right: var(--margin)
		animation: shrink 0.2s ease-in-out
		scale: var(--scale)
		background-color: black
		flex-shrink: 0
		width: var(--width)
		aspect-ratio: 16/9
		background-position: center
		background-size: cover
		display: flex
		align-items: center
		justify-content: center
		background-image: var(--url)
		border-radius: 20px
		-webkit-box-reflect: below 0px linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0, 0, 0, 0.2) 75%, rgba(0,0,0,0.4) 100%)

	.playlist-item:hover
		@media (hover: hover)
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
		background-color: rgba(0, 0, 0, 0.5)
		transition: background-color 0.2s ease-in-out
		color: white

		@media (hover: none)
			display: none

		span
			font-size: 7rem
			color: rgba(255, 255, 255, 1)
			color: white
			transition: color 0.2s ease-in-out

			@media (hover: none)
				display: none

		.title
			position: absolute
			margin: 0px
			top: -25px
			left: 0
			// Esconder el título cuando se hace más grande
			color: rgba(0, 0, 0, calc(1.2 - var(--scale)))
			font-size: 3rem
			text-align: center
			width: 100%
			transform: translateY(-100%)
			transition-property: transform, opacity
			transition-duration: 0.4s
			transition-timing-function: ease-in-out
			@media (hover: none)
				display: none

	.playlist-item:not(:hover)
		.overlay
			background-color: rgba(0, 0, 0, 0)
			transition: background-color 0.5s ease-in-out
			
			span
				color: rgba(255, 255, 255, 0)
				transition: color 0.5s ease-in-out

			.title
				opacity: 0
				transform: translateY(0)
				transition-duration: 0.5s

	.playlist-item :global(.border-radius)
		border-radius: 20px

	.title-overlay
		opacity: calc(var(--scale) - 0.35)
		position: absolute
		bottom: 0
		color: white
		background-color: black
		width: 100%
		border-radius: 0 0 20px 20px
		font-size: 1.4rem

		h3
			margin: 1rem
</style>
