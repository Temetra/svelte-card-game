<script lang="ts">
	import { GameState, gameState, playerOneScore } from "@/modules/Game";
	import { Combination } from "@/modules/Cards";
	$: showScore = $playerOneScore && (
		$gameState == GameState.Selection || 
		$gameState == GameState.Discard || 
		$gameState == GameState.Summary
	);
</script>

<style type="text/scss">
	section {
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
	}
</style>

<section>
	{#if showScore && $playerOneScore}
		{Combination[$playerOneScore.combination]}
	{:else}
		This is the score
	{/if}
</section>