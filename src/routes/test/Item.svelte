<div class="item" bind:this={div} style="--scale: {scale}" />

<script lang="ts">
	import { onMount } from 'svelte'

	export let index: number

	let div: HTMLDivElement | null = null
	let scale = 1

	onMount(() => {
		div?.parentElement?.addEventListener('scroll', handleScroll)
		scale = getScale()
	})

	function handleScroll() {
		scale = getScale()
	}

	function getScale() {
		const scroll = div?.parentElement?.scrollLeft ?? 0
		const distance = index * 220 - scroll
		scale = 1.2 - Math.abs(distance) / 600
		scale = Math.max(scale, 0.25)
		return scale
	}
</script>

<style lang="sass">
    .item
        background-color: red
        width: 200px
        height: 50px
        margin: 10px
        border: solid
        flex-shrink: 0
        transform: scale(var(--scale))
</style>
