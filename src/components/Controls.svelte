<script lang="ts">
	import { GameState, gameState, requestNewCards } from "@/modules/Game";
	import type { Card } from "@/modules/Cards";
	import { Suit, Rank, CardState } from "@/modules/Cards";
	import CardGraphic from "@/components/CardGraphic.svelte";

	$: disabled = $gameState != GameState.Ready;

	let card: Card;
	$: {
		card = { 
			suit: Suit.Clubs, 
			rank: Rank.Ace, 
			state: disabled ? CardState.Default : CardState.Spinning 
		};
	}
</script>

<style type="text/scss">
	section {
		grid-area: controls;
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		row-gap: 15px;
		column-gap: 15px;
		margin: 20px;
		--card-width: #{(500px/32)};
		--card-height: #{(700px/32)};
	}

	.icon {
		perspective: 100px;
	}

	.text {
		margin-left:4px;
	}
</style>

<section>
	<button type="button" class="cyan" on:click={requestNewCards} {disabled}>
		<span class="icon"><CardGraphic {card} /></span>
		<span class="text">Deal cards</span>
	</button>
</section>