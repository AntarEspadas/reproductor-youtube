import { writable } from 'svelte/store'

export const playerState = writable(-1)

export const selectedTrack = writable(0)

export const currentThumbnail = writable('')
