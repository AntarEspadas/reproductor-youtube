export function getRandomIndex(length: number, currentIndex: number): number {
	if (length === 1) return 0
	let index = 0
	do {
		index = Math.floor(Math.random() * length)
	} while (index === currentIndex)
	return index
}

// https://www.geeksforgeeks.org/implement-search-box-with-debounce-in-javascript/
export function debounce<T extends unknown[]>(fn: (...args: T) => void, delay: number) {
	let timerId: number | undefined = undefined
	return (...args: T) => {
		clearTimeout(timerId)
		timerId = setTimeout(() => fn(...args), delay)
	}
}
