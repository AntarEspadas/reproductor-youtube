<PlaylistItemsComponent {playlistItems} {selectedId} />
<Controls playing={[1, 3].includes($playerState)} on:playPauseClicked={handlePlayPause} />

<script lang="ts">
	import Controls from '$lib/components/Controls.svelte'
	import PlaylistItemsComponent from './PlaylistItems.svelte'
	import type { PlaylistItems } from '$lib/youtube/types'
	import { playerState } from '$lib/stores'

	export let playlistItems: PlaylistItems

	$: selectedId = playlistItems.items[0].id

	function handlePlayPause() {
		if ([1, 3].includes($playerState)) {
			$playerState = 2
		} else {
			$playerState = 1
		}
	}
</script>
