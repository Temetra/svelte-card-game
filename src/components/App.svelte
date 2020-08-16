<script lang="ts">
	import { onMount } from "svelte";
	import { prepareAudio } from "@/modules/Audio";
	import { prepareGame } from "@/modules/Game";
	import Controls from "@/components/Controls.svelte";
	import PlayingArea from "@/components/PlayingArea.svelte";

	onMount(async () => {
		await prepareAudio();
		await prepareGame();
	});
</script>

<style type="text/scss">
	section {
		display: grid;
		grid-template-areas:
			"playing-area"
			"controls";
		grid-template-columns: 1fr;
		grid-template-rows: 1fr auto;
		height: 100%;
	}
</style>

<section>
	<Controls />
	<PlayingArea />
</section>