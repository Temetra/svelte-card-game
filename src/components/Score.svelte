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

<svelte:head>
	<link href="https://fonts.googleapis.com/css2?family=Lora:wght@600&display=swap" rel="stylesheet"> 
</svelte:head>

<style type="text/scss">
	section {
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}

	.score {
		transform-style: preserve-3d;
		transform: translateX(0px) rotateX(30deg) rotateY(0deg);

		// Scaling width, matches card container
		width: 90vmin;
		height: 45vmin;

		display: flex;
		justify-content: center;
		align-items: flex-start;

		div {
			color: #ffffff85;
			filter: drop-shadow(0 0 2px white);
			font-size: calc(max(6vmin, 20pt));
			font-family: 'Lora', serif;
			text-transform: uppercase;
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

<section class="shared-perspective">
	<div class="score" class:showScore>
		<div>
			{combination}
		</div>
	</div>
</section>