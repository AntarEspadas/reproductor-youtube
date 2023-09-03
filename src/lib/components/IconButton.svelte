<button class="icon-button" class:highlight {type} on:click aria-label={label}>
	<span class="material-symbols-{variant}" style="--icon-size: {iconSize}">
		{icon}
	</span>
</button>

<script lang="ts">
	export let icon: string
	export let variant: 'outlined' | 'rounded' = 'rounded'
	export let highlight: boolean = false
	export let label: string
	export let type: 'button' | 'submit' | 'reset' = 'button'
	export let iconSize: string = '3rem'
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
        background-color: rgba(0, 0, 0, 0.3)

    &:hover
        @media (hover: hover)
            background-color: rgba(0, 0, 0, 0.4)
    &:active
        background-color: rgba(0, 0, 0, 0.5)

    span
        font-size: var(--icon-size)

</style>
