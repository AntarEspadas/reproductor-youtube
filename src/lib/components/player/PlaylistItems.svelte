<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	bind:this={div}
	bind:clientWidth
	on:scroll={handleScroll}
	on:mouseup={handleMouseUp}
	on:dragend={handleMouseUp}
	on:touchend={handleMouseUp}
	class="playlist-items"
	style="--padding: {padding}px"
>
	{#each playlistItems.items as item, i (item.id)}
		<PlaylistItemComponent
			index={i}
			{item}
			{margin}
			{width}
			selected={i === selectedIndex}
			parentWidth={clientWidth}
			on:click={handleItemClick}
		/>
	{/each}
</div>

<script lang="ts">
	import PlaylistItemComponent from './PlaylistItem.svelte'
	import type { PlaylistItems, Item } from '$lib/youtube/types'
	import { onMount, tick } from 'svelte'
	import { selectedTrack, playerState } from '$lib/stores'
	import type { LoopMode } from './types'
	import { getRandomIndex } from '$lib/util'

	export let playlistItems: PlaylistItems
	export let loopMode: LoopMode
	export let shuffle: boolean

	let scroll = 0
	let clientWidth = 0
	let windowWidth = window?.innerWidth ?? 0
	let div: HTMLDivElement | null = null

	$: width = getWidth(windowWidth)
	$: padding = clientWidth / 2 - 225
	$: margin = windowWidth / 2 - width * 1.25
	$: selectedIndex = 0

	$: {
		// ESto está aquí para que el bloque se ejecute
		//cada vez que cambie el valor de playlistItems
		playlistItems
		// Debido a la propiedad scroll-snap, por alguna razón
		// a veces la lista empieza con el segundo video seleccionado.
		// Esto parece solucionarlo
		div?.scrollTo({ left: 0, behavior: 'instant' })
	}

	$: if ($selectedTrack !== selectedIndex) {
		const scroll = $selectedTrack * (width + margin)
		selectItem($selectedTrack, scroll)
	}

	$: if ($playerState === 0) {
		if (loopMode === 'one') $playerState = 1
		else if (shuffle) {
			$selectedTrack = getRandomIndex(playlistItems.items.length, $selectedTrack)
		} else if (loopMode === 'all')
			if ($selectedTrack === playlistItems.items.length - 1) $selectedTrack = 0
			else $selectedTrack += 1
		else if (loopMode === 'none' && $selectedTrack !== playlistItems.items.length - 1)
			$selectedTrack += 1
	}

	function getWidth(windowWidth: number) {
		if (windowWidth < 600) return 180
		if (windowWidth < 900) return 280
		if (windowWidth < 1200) return 425
		if (windowWidth < 1536) return 550
		return 600
	}

	async function selectItem(index: number, scroll: number) {
		selectedIndex = -1
		// Esperar a que se apliquen los cambios
		await tick()
		div?.scrollTo({ left: scroll, behavior: 'smooth' })
		// Esperar a que termine da hacerse scroll antes de actualizar el DOM
		setTimeout(() => {
			selectedIndex = index
		}, 75)
	}

	async function handleItemClick(e: CustomEvent<{ index: number }>) {
		$selectedTrack = e.detail.index
	}

	function handleScroll(e: Event) {
		scroll = (e.target as HTMLDivElement).scrollLeft
	}

	function handleMouseUp() {
		// Esperar a que termine da hacerse scroll antes de actualizar el DOM
		const initialIndex = selectedIndex
		setTimeout(() => {
			// Si se seleccionó otro item mientras se hacía scroll, no hacer nada
			if (initialIndex !== selectedIndex) return
			selectedIndex = Math.round(scroll / (width + margin))
			$selectedTrack = selectedIndex
		}, 225)
	}

	// function handleStateChange(e: {
	// 	detail: { index: number; videoId: string; state: YT.PlayerState; scroll: number }
	// }) {
	// 	if (e.detail.state !== YT.PlayerState.ENDED) return
	// 	const index = e.detail.index
	// 	const nextId = playlistItems.items[index + 1]?.id
	// 	if (!nextId) return
	// 	const scroll = e.detail.scroll + width + margin
	// 	selectItem(nextId, scroll)
	// }

	onMount(() => {
		window.addEventListener('resize', () => {
			windowWidth = window.innerWidth
		})
	})
</script>

<style lang="sass">

    @import "$lib/styles/breakpoints"

    .playlist-items
        width: 100%
        display: flex
        align-items: center
        overflow-x: scroll
        overflow-y: hidden
        scroll-snap-type: x mandatory

        @include xs
            height: 200px
        @include sm
            height: 300px
        @include md
            height: 400px
        @include lg
            height: 500px
</style>
