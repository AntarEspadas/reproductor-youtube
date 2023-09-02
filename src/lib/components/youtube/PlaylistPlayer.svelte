<PlaylistItemsComponent {playlistItems} {loopMode} />
<Controls
	playing={[1, 3].includes($playerState)}
	bind:loop={loopMode}
	on:playPauseClicked={handlePlayPause}
	on:nextClicked={() => ($selectedTrack += 1)}
	on:previousClicked={() => ($selectedTrack -= 1)}
/>

<script lang="ts">
	import Controls from '$lib/components/Controls.svelte'
	import PlaylistItemsComponent from './PlaylistItems.svelte'
	import type { PlaylistItems } from '$lib/youtube/types'
	import { playerState, selectedTrack } from '$lib/stores'
	import type { LoopMode } from './types'

	export let playlistItems: PlaylistItems

	let loopMode: LoopMode = 'none'

	function handlePlayPause() {
		if ([1, 3].includes($playerState)) {
			$playerState = 2
		} else {
			$playerState = 1
		}
	}
</script>
