<button class:highlight on:click>
	<span class="material-symbols-{variant}">
		{icon}
	</span>
</button>

<script lang="ts">
	export let icon: string
	export let variant: 'outlined' | 'rounded' = 'rounded'
	export let highlight: boolean = false
</script>

<style lang="sass">
button
    display: flex
    justify-content: center
    align-items: center
    background-color: rgba(0, 0, 0, 0)
    border: none
    color: #333
    cursor: pointer
    border-radius: 50%
    aspect-ratio: 1/1
    transition: background-color 0.1s ease-in-out

    &.highlight
        background-color: rgba(0, 0, 0, 0.1)

    &:hover
        background-color: rgba(0, 0, 0, 0.2)
    &:active
        background-color: rgba(0, 0, 0, 0.3)

    span
        font-size: 3rem

</style>
