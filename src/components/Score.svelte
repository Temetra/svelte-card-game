<script lang="ts">
	import { GameState, gameState, Combination, playerOneScore } from "@/modules/Game";
	$: showScore = $playerOneScore && (
		$gameState == GameState.Selecting || 
		$gameState == GameState.Finished
	);
</script>

<style type="text/scss">
	section {
		grid-area: score;
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
	}
</style>

<section>
	{#if showScore && $playerOneScore}
		{Combination[$playerOneScore.combination]}
	{/if}
</section>