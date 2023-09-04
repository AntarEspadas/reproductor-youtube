<div class="loading" style="--size: {size}; --color: {color}; --secondary-color: {secondaryColor}">
	<div class="dot-flashing" />
</div>

<script lang="ts">
	export let size = '10px'
	export let color = '#333'
	export let secondaryColor = 'rgba(152, 152, 152, 0.2)'
</script>

<style lang="sass">
    .dot-flashing
        margin: 0 calc(var(--size) * 1.5)
        position: relative
        width: var(--size)
        height: var(--size)
        border-radius: calc(var(--size) / 2)
        background-color: var(--color)
        color: var(--color)
        animation: dot-flashing 1s infinite linear alternate
        animation-delay: 0.5s

        &::before, &::after
            content: ""
            display: inline-block
            position: absolute
            top: 0

        &::before
            left: calc(var(--size) * -1.5)
            width: var(--size)
            height: var(--size)
            border-radius: calc(var(--size) / 2)
            background-color: var(--color)
            color: var(--color)
            animation: dot-flashing 1s infinite alternate
            animation-delay: 0s

        &::after
            left: calc(var(--size) * 1.5)
            width: var(--size)
            height: var(--size)
            border-radius: calc(var(--size) / 2)
            background-color: var(--color)
            color: var(--color)
            animation: dot-flashing 1s infinite alternate
            animation-delay: 1s

    @keyframes dot-flashing
        0%
            background-color: var(--color)

        50%, 100%
            background-color: var(--secondary-color)
</style>
