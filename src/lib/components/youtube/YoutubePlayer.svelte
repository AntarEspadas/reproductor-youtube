<div class="youtube-player border-radius" class:visible>
	<div {id} class="border-radius" />
</div>

<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte'

	export let videoId: string
	export let index: number

	const dispatch = createEventDispatcher<{
		stateChange: { index: number; videoId: string; state: YT.PlayerState }
	}>()

	let visible = false

	$: id = `yt-player-${index}`

	onMount(() => {
		const player = new YT.Player(id, {
			height: '100%',
			width: '100%',
			videoId,
			playerVars: {
				autoplay: 1,
				controls: 1,
				modestbranding: 1,
				rel: 0,
				showinfo: 0,
				fs: 0,
				iv_load_policy: 3,
				disablekb: 1,
				enablejsapi: 1
			},
			events: {
				onReady: onPlayerReady,
				onStateChange: onPlayerStateChange
			}
		})

		return () => {
			player.destroy()
		}

		function onPlayerReady() {
			// Idealmente, el video se pondrá en visible cuando empiece a reproducirse
			// pero si no se reproduce, se pondrá visible después de 2 segundos
			setTimeout(() => {
				visible = true
			}, 2000)
		}

		function onPlayerStateChange(e: YT.OnStateChangeEvent) {
			if (e.data === 1) visible = true
			dispatch('stateChange', { index, videoId, state: e.data })
		}
	})
</script>

<style lang="sass">
    .youtube-player
        opacity: var(--opacity)
        width: 100%
        height: 100%
        opacity: 0

    .youtube-player.visible
        opacity: 1
        transition: opacity 0.4s ease-in-out
</style>
