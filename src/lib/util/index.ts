export function getRandomIndex(length: number, currentIndex: number): number {
	if (length === 1) return 0
	let index = 0
	do {
		index = Math.floor(Math.random() * length)
	} while (index === currentIndex)
	return index
}
