<form on:submit|preventDefault={(e) => dispatch('search', { query: encodeURIComponent(query) })}>
	<div class="container">
		<input type="search" id="search" bind:value={query} />
		<IconButton type="submit" label="buscar" icon="search" iconSize="2rem" />
	</div>
</form>

<script lang="ts">
	import IconButton from '$lib/components/IconButton.svelte'
	import { createEventDispatcher } from 'svelte'

	export let query = ''

	const dispatch = createEventDispatcher<{
		search: { query: string }
	}>()
</script>

<style lang="sass">

	@import "$lib/styles/breakpoints"

	form
		width: 100%
		display: flex
		justify-content: center
		align-items: center
		margin: 2rem 0

	.container 
		display: grid
		grid-template-columns: 1fr 40px
		gap: 0.5rem

		@include xs
			width: 100%
		@include sm
			width: 400px

	input
		padding: 0.5rem
		border: 1px solid #ccc
		border-radius: 0.5rem
		margin-right: 0.5rem

</style>
