<div class="youtube-player border-radius" class:visible>
	<div {id} class="border-radius" />
</div>

<script lang="ts">
	import { onMount } from 'svelte'
	import { playerState } from '$lib/stores'

	export let videoId: string
	export let index: number

	let visible = false

	$: id = `yt-player-${index}`

	onMount(() => {
		const player = new YT.Player(id, {
			host: 'https://www.youtube-nocookie.com',
			height: '100%',
			width: '100%',
			videoId,
			playerVars: {
				autoplay: 1,
				controls: 1,
				modestbranding: 1,
				rel: 0,
				showinfo: 0,
				fs: 1,
				iv_load_policy: 3,
				disablekb: 1,
				enablejsapi: 1
			},
			events: {
				onReady: onPlayerReady,
				onStateChange: (e) => {
					$playerState = e.data
					if (e.data === 1) visible = true
				}
			}
		})

		const unsubscribe = playerState.subscribe((playerState) => {
			if (playerState === player.getPlayerState?.()) return
			if (playerState === 1) {
				player.playVideo?.()
			} else if (playerState === 2) {
				player.pauseVideo?.()
			}
		})

		return () => {
			player.destroy()
			unsubscribe()
		}
	})

	function onPlayerReady() {
		// Idealmente, el video se pondrá en visible cuando empiece a reproducirse
		// pero si no se reproduce, se pondrá visible después de 2 segundos
		setTimeout(() => {
			visible = true
		}, 2000)
	}
</script>

<style lang="sass">
    .youtube-player
        opacity: var(--opacity)
        width: 100%
        height: 100%
        opacity: 0
        position: absolute

    .youtube-player.visible
        opacity: 1
        transition: opacity 0.4s ease-in-out
</style>
