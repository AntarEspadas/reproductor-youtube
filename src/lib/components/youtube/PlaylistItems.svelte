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
			selected={item.id === selectedId}
			parentWidth={clientWidth}
			on:click={handleItemClick}
			on:stateChange={handleStateChange}
		/>
	{/each}
</div>

<script lang="ts">
	import PlaylistItemComponent from './PlaylistItem.svelte'
	import type { PlaylistItems, Item } from '$lib/youtube/types'
	import { onMount, tick } from 'svelte'

	export let playlistItems: PlaylistItems
	export let selectedId: string

	let scroll = 0
	let clientWidth = 0
	let windowWidth = window?.innerWidth ?? 0
	let div: HTMLDivElement | null = null

	$: width = getWidth(windowWidth)
	$: padding = clientWidth / 2 - 225
	$: margin = windowWidth / 2 - width * 1.25

	function getWidth(windowWidth: number) {
		if (windowWidth < 600) return 180
		if (windowWidth < 900) return 280
		if (windowWidth < 1200) return 425
		if (windowWidth < 1536) return 550
		return 600
	}

	async function selectItem(id: string, scroll: number) {
		selectedId = id
		selectedId = ''
		// Esperar a que se apliquen los cambios
		await tick()
		div?.scrollTo({ left: scroll, behavior: 'smooth' })
		// Esperar a que termine da hacerse scroll antes de actualizar el DOM
		setTimeout(() => {
			selectedId = id
		}, 75)
	}

	async function handleItemClick(e: CustomEvent<{ item: Item; scroll: number }>) {
		const scroll = e.detail.scroll
		selectItem(e.detail.item.id, scroll)
	}

	function handleScroll(e: Event) {
		scroll = (e.target as HTMLDivElement).scrollLeft
	}

	function handleMouseUp() {
		// Esperar a que termine da hacerse scroll antes de actualizar el DOM
		const idInicial = selectedId
		setTimeout(() => {
			// Si se seleccionó otro item mientras se hacía scroll, no hacer nada
			if (idInicial !== selectedId) return
			const selectedIndex = Math.round(scroll / (width + margin))
			selectedId = playlistItems.items[selectedIndex].id
		}, 225)
	}

	function handleStateChange(e: {
		detail: { index: number; videoId: string; state: YT.PlayerState; scroll: number }
	}) {
		if (e.detail.state !== YT.PlayerState.ENDED) return
		const index = e.detail.index
		const nextId = playlistItems.items[index + 1]?.id
		if (!nextId) return
		const scroll = e.detail.scroll + width + margin
		selectItem(nextId, scroll)
	}

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
