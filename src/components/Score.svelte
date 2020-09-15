<script lang="ts">
	import { GameState, gameState, playerOneScore } from "@/modules/Game";
	import { Combination } from "@/modules/Cards";
	import { geti18nText as text } from "@/modules/Assets";

	let combination: string;
	playerOneScore.subscribe(x => {
		if (x != null) {
			combination = text(`Combinations.${Combination[x.combination]}`);
		}
	});
	
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

		// Scaling width, matches card container
		width: calc(min(calc(40vmin + 400px), 90vw));
		margin-top: 5vh;

		display: flex;
		justify-content: flex-end;
		align-items: center;

		div {
			// Aspect ratio, taller than wide
			margin-bottom: 40%;

			color: #ffffffb0;
			filter: drop-shadow(0 0 2px white);
			font-size: calc(max(6vmin, 20pt));
		}
	}

	.score {
		transition:filter 300ms, opacity 300ms;
		filter: blur(30px);
		opacity: 0;

		&.showScore {
			filter: blur(0.1px);
			opacity: 1;
		}
	}
</style>

<section>
	<div class="score" class:showScore>
		<div>
			{combination}
		</div>
	</div>
</section>