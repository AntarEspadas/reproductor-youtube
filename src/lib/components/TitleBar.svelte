<div class="playlist-title">
	<div class="container">
		<h1>{title}</h1>
	</div>
</div>

<script lang="ts">
	export let title: string
</script>

<style lang="sass">
    .playlist-title
        width: 100%
        display: flex
        justify-content: center
        align-items: center
    .container
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2)
        padding: 1rem
        border-radius: 3rem
</style>
