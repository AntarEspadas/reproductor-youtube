<li>
	<a href="/playlist/{id}">
		<img src={snippet.thumbnails.default.url} alt="" />
		{snippet.title}
	</a>
</li>

<script lang="ts">
	import type { Snippet } from '$lib/youtube/types'

	export let id: string
	export let snippet: Snippet
</script>
