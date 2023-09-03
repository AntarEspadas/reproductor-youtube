<div class="controls">
	<!-- Botón repetir -->
	<IconButton
		label="bucle"
		icon={loopIcon}
		highlight={loop !== 'none'}
		on:click={handleLoopClicked}
	/>
	<!-- Botón de regresar -->
	<IconButton label="regresar" icon="skip_previous" on:click={() => dispatch('previousClicked')} />
	<!-- Botón de play-pausa -->
	<IconButton
		label={playing ? 'pausar' : 'reanudar'}
		icon={playPauseIcon}
		on:click={() => dispatch('playPauseClicked')}
	/>
	<!-- Botón de saltar -->
	<IconButton label="saltar" icon="skip_next" on:click={() => dispatch('nextClicked')} />
	<!-- Botón aleatorio -->
	<IconButton
		label="aleatorio"
		icon="shuffle"
		highlight={shuffle}
		on:click={() => (shuffle = !shuffle)}
	/>
</div>

<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import IconButton from '../IconButton.svelte'
	import type { LoopMode } from './types'

	export let playing: boolean = true
	export let loop: LoopMode = 'none'
	export let shuffle: boolean = false

	$: playPauseIcon = playing ? 'pause' : 'play_arrow'
	$: loopIcon = loop === 'none' ? 'repeat' : loop === 'one' ? 'repeat_one' : 'repeat'

	const dispatch = createEventDispatcher<{
		playPauseClicked: void
		nextClicked: void
		previousClicked: void
	}>()

	function handleLoopClicked() {
		if (loop === 'none') loop = 'one'
		else if (loop === 'one') loop = 'all'
		else loop = 'none'
	}
</script>

<style lang="sass">
    .controls
        display: flex
        flex-direction: row
        justify-content: center
        align-items: center
</style>
