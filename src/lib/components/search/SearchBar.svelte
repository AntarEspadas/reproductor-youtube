<form on:submit|preventDefault={(e) => dispatch('search')}>
	<input type="search" id="search" bind:value={query} />
	<button type="submit">Cargar</button>
</form>

<script lang="ts">
	import { createEventDispatcher } from 'svelte'

	export let query = ''

	const dispatch = createEventDispatcher<{
		search: void
	}>()
</script>
