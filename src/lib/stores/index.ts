import { writable } from 'svelte/store'

export const playerState = writable(-1)

export const selectedTrack = writable(0)

function thumbnailStore() {
	const defaultValue =
		// Esta es una URL que contiene una imágen SVG con un rectángulo blanco
		'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22640%22%20height%3D%22480%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22white%22%2F%3E%3Ctext%20x%3D%22320%22%20y%3D%22240%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3E640x480%3C%2Ftext%3E%3C%2Fsvg%3E'
	const store = writable(defaultValue)
	return {
		...store,
		reset() {
			store.set(defaultValue)
		}
	}
}

export const currentThumbnail = thumbnailStore()
