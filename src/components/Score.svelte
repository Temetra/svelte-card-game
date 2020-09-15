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
		perspective: 1000px;

		position:absolute;
		height: 100%;
		width: 100%;

		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}

	.score {
		transform-style: preserve-3d;
		transform: translateX(0px) rotateX(30deg) rotateY(0deg);
		width: calc(min(calc(40vmin + 400px), 90vw));
		margin-top: 5vh;
		display: flex;
		justify-content: flex-end;
		align-items: center;

		div {
			color: #ffffffe0;
			filter: drop-shadow(0 0 2px white);
			font-size: calc(max(6vmin, 20pt));
			margin-bottom: 40%;
		}
	}
</style>

<section>
	<div class="score">
		<div>
			{#if showScore && $playerOneScore}
				{Combination[$playerOneScore.combination]}
			{/if}
		</div>
	</div>
</section>