<script lang="ts">
	import { onMount } from "svelte";
	import { GameState, gameState, prepareGame, handleKeyboardInput } from "@/modules/Game";
	import PlayingArea from "@/components/PlayingArea.svelte";
	import Progress from "@/components/Progress.svelte";

	onMount(async () => await prepareGame());
</script>

<style type="text/scss">
</style>

<svelte:window on:keydown={handleKeyboardInput}/>

{#if $gameState == GameState.Preparing}
	<Progress />
{:else}
	<PlayingArea />
{/if}
