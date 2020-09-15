<script lang="ts">
	import { onMount } from "svelte";
	import { GameState, gameState, prepareGame, handleKeyboardInput } from "@/modules/Game";
	import Progress from "@/components/Progress.svelte";
	import Logo from "@/components/Logo.svelte";
	import PlayingTable from "@/components/PlayingTable.svelte";
	import PlayingCards from "@/components/PlayingCards.svelte";
	import Score from "@/components/Score.svelte";
	import Controls from "@/components/Controls.svelte";

	onMount(async () => await prepareGame());
</script>

<svelte:window on:keydown={handleKeyboardInput}/>

{#if $gameState == GameState.Preparing}
	<Progress />
{:else}
	<PlayingTable />
	<Logo />
	<Score />
	<PlayingCards />
	<Controls />
{/if}
