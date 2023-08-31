<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	bind:this={div}
	bind:clientWidth
	on:scroll={handleScroll}
	on:mouseup={handleMouseUp}
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
		/>
	{/each}
</div>

<script lang="ts">
	import PlaylistItemComponent from '$lib/components/PlaylistItem.svelte'
	import type { PlaylistItems, PlaylistItem } from '$lib/youtube/types'
	import { onMount, tick } from 'svelte'

	export let playlistItems: PlaylistItems
	export let selectedId: string

	let scroll = 0
	let clientWidth = 0
	let windowWidth = window?.innerWidth ?? 0
	let div: HTMLDivElement | null = null

	const width = 600
	$: padding = clientWidth / 2 - 225
	$: margin = windowWidth / 2 - 750

	async function handleItemClick(e: CustomEvent<{ item: PlaylistItem; scroll: number }>) {
		const scroll = e.detail.scroll
		selectedId = ''
		await tick()
		div?.scrollTo({ left: scroll, behavior: 'smooth' })
		// Esperar a que termine da hacerse scroll antes de actualizar el DOM
		setTimeout(() => {
			selectedId = e.detail.item.id
		})
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

	onMount(() => {
		window.addEventListener('resize', () => {
			windowWidth = window.innerWidth
		})
	})
</script>

<style lang="sass">
    .playlist-items
        width: 100%
        height: 500px
        display: flex
        align-items: center
        overflow-x: scroll
        scroll-snap-type: x mandatory
</style>
