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

		span {
			display: block;
			color: #ffffffe0;
			font-size: calc(min(8vmax, 32pt));
			margin-top: 40%;
		}
	}
</style>

<section>
	<div class="score">
		<span>
			{#if showScore && $playerOneScore}
				{Combination[$playerOneScore.combination]}
			{/if}
		</span>
	</div>
</section>