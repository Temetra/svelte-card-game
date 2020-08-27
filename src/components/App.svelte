<script lang="ts">
	import { onMount } from "svelte";
	import { prepareAudio } from "@/modules/Audio";
	import { prepareGame } from "@/modules/Game";
	import { prepareCardGraphics } from "@/modules/CardImages";
	import { loaded } from "@/stores/datastore";
	import Controls from "@/components/Controls.svelte";
	import PlayingArea from "@/components/PlayingArea.svelte";
	import Progress from "@/components/Progress.svelte";

	onMount(async () => {
		await prepareAudio();
		await prepareCardGraphics();
		await prepareGame();
		$loaded = true;
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
	{#if $loaded}
		<Controls />
		<PlayingArea />
	{:else}
		<Progress />
	{/if}
</section>
