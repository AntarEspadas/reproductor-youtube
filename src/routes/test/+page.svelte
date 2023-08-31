<div class="parent">
	{#each new Array(20).fill(1).map((_, i) => i) as i}
		<Item index={i} />
	{/each}
</div>

<script lang="ts">
	import Item from './Item.svelte'
</script>

<style lang="sass">


    .parent
        display: flex
        width: 100vw
        overflow-x: scroll
</style>
