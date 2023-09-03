<li class:visible class="search-result-item" use:inview on:inview_enter={handleInviewEnter}>
	<a href="/playlist/{id}">
		<div class="container">
			<img src={snippet.thumbnails.default.url} alt="thumbnail" />
			<h3>
				{snippet.title}
			</h3>
		</div>
	</a>
</li>

<script lang="ts">
	import type { Snippet } from '$lib/youtube/types'
	import { inview } from 'svelte-inview'
	import { onMount } from 'svelte'

	export let id: string
	export let snippet: Snippet
	export let index: number

	let inView = false
	let timedOut = false
	$: visible = inView && timedOut

	function handleInviewEnter(e: CustomEvent<ObserverEventDetails>) {
		inView = true
		console.log(inView)
	}

	onMount(() => {
		setTimeout(() => {
			timedOut = true
		}, index * 100 + 100)
	})
</script>

<style lang="sass">

	@import "$lib/styles/breakpoints"

	li
		max-width: 700px
		list-style: none

	img
		border-radius: 0.5rem

	h3
		font-size: 1.5rem

	a
		text-decoration: none
		color: inherit

	.container
		display: grid
		grid-template-columns: auto 1fr
		gap: 1rem
		align-items: center

		background-color: #f5f5f5
		margin: 0.5rem
		padding: 1rem
		border-radius: 1.5rem
		box-shadow: 0.5rem 0.5rem 0.5rem rgba(0, 0, 0, 0.2)
		transition: transform 0.3s ease-in-out

		@include md
			&:hover
				transform: translateX(5%)

	.search-result-item
		opacity: 0
		transform: translateX(-20%)
		transition-property: opacity, transform
		transition-duration: 0.5s
		transition-timing-function: ease-in-out
		&.visible		
			opacity: 1
			transform: translateX(0)
</style>
