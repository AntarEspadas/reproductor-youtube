<PlaylistItemsComponent {playlistItems} {loopMode} {shuffle} />
<Controls
	playing={[1, 3].includes($playerState)}
	bind:loop={loopMode}
	bind:shuffle
	on:playPauseClicked={handlePlayPause}
	on:nextClicked={handleNext}
	on:previousClicked={handlePrevious}
/>

<script lang="ts">
	import Controls from './Controls.svelte'
	import PlaylistItemsComponent from './PlaylistItems.svelte'
	import type { PlaylistItems } from '$lib/youtube/types'
	import { playerState, selectedTrack } from '$lib/stores'
	import type { LoopMode } from './types'
	import { getRandomIndex } from '$lib/util'

	export let playlistItems: PlaylistItems

	let loopMode: LoopMode = 'none'
	let shuffle = false

	function handlePlayPause() {
		if ([1, 3].includes($playerState)) {
			$playerState = 2
		} else {
			$playerState = 1
		}
	}

	function handleNext() {
		if (!shuffle) $selectedTrack += 1
		else $selectedTrack = getRandomIndex(playlistItems.items.length, $selectedTrack)
	}

	function handlePrevious() {
		$selectedTrack -= 1
	}
</script>
