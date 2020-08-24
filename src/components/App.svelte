<script lang="ts">
	import { onMount } from "svelte";
	import { prepareAudio } from "@/modules/Audio";
	import { prepareGame } from "@/modules/Game";
	import { prepareCardGraphics } from "@/modules/CardImages";
	import Controls from "@/components/Controls.svelte";
	import PlayingArea from "@/components/PlayingArea.svelte";
	import Progress from "@/components/Progress.svelte";

	let ready = false;

	onMount(async () => {
		await prepareAudio();
		await prepareCardGraphics();
		await prepareGame();
		ready = true;
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
	{#if ready}
		<Controls />
		<PlayingArea />
	{:else}
		<Progress />
	{/if}
</section>
