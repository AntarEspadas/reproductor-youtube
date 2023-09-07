<div class="no-results" transition:fade>
	<div class="no-results-wrapper">
		<span class="material-symbols-outlined"> search_off </span>
		<p>No se encontraron resultados</p>
	</div>
</div>

<script lang="ts">
	import { fade } from 'svelte/transition'
</script>

<style lang="sass">
    .no-results
        width: 100%
        height: 100%
        display: flex
        justify-content: center
        align-items: center
        font-size: 2rem

    .no-results-wrapper
        display: flex
        width: 100%
        justify-content: center
        align-items: center
        flex-direction: column

    span
        font-size: 3rem
</style>
