<script lang="ts">
	import { onMount } from "svelte";
	import { GameState, gameState, prepareGame } from "@/modules/Game";
	import Controls from "@/components/Controls.svelte";
	import PlayingArea from "@/components/PlayingArea.svelte";
	import Progress from "@/components/Progress.svelte";

	onMount(async () => await prepareGame());
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
	{#if $gameState == GameState.Preparing}
		<Progress />
	{:else}
		<Controls />
		<PlayingArea />
	{/if}
</section>
